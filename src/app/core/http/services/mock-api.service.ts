import { Injectable } from '@angular/core';
import { CatalogProductsGetQueries, ProductPagedQueryResponse } from '@models/features/catalog';
import {
  AnonymousSessionAccessTokenPostResponse,
  CustomersPostResponse,
  CustomersTokenPostResponse,
  ExampleGetResponse,
  LoginPostResponse,
  RefreshTokenPostResponse,
} from '@models/http';
import {
  CustomerGetResponse,
  CustomerPatchResponse,
  CustomerUpdateBody,
} from '@models/http/request/me.type';
import { createMockCustomer, mockProductDtos, mockToken } from '../../../mocks/api.mocks';
import { delay, Observable, of } from 'rxjs';
import { GetRequest, PostRequest } from '../types/api.types';
import { ApiServiceBase } from './api-service.base';

const MOCK_DELAY_MS = 200;

@Injectable()
export class MockApiService extends ApiServiceBase {
  private customer = createMockCustomer();

  public override exampleGet(): Observable<ExampleGetResponse> {
    return this.respond([{ id: 1, text: 'Mock example' }]);
  }

  public override anonymousSessionAccessTokenPost(): Observable<AnonymousSessionAccessTokenPostResponse> {
    return this.respond({ ...mockToken });
  }

  public override refreshTokenPost(): Observable<RefreshTokenPostResponse> {
    return this.respond({ ...mockToken });
  }

  public override loginPost(): Observable<LoginPostResponse> {
    return this.respond({ ...mockToken });
  }

  public override customersPost(): Observable<CustomersPostResponse> {
    const customer = this.customer;

    return this.respond({
      ...mockToken,
      customer: {
        id: customer.id,
        version: customer.version,
        versionModifiedAt: customer.lastModifiedAt,
        lastMessageSequenceNumber: 1,
        createdAt: customer.createdAt,
        lastModifiedAt: customer.lastModifiedAt,
        lastModifiedBy: customer.lastModifiedBy,
        createdBy: customer.createdBy,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        password: customer.password,
        addresses: [],
        shippingAddressIds: customer.shippingAddressIds,
        billingAddressIds: customer.billingAddressIds,
        isEmailVerified: customer.isEmailVerified,
        customerGroupAssignments: customer.customerGroupAssignments,
        stores: customer.stores,
        authenticationMode: customer.authenticationMode,
      },
    });
  }

  public override customersTokenPost(): Observable<CustomersTokenPostResponse> {
    return this.respond({ ...mockToken });
  }

  public override getCatalogProducts(
    request: GetRequest<{ Q: CatalogProductsGetQueries }>,
  ): Observable<ProductPagedQueryResponse> {
    const limit = Number(request.params?.['limit'] ?? request.queries?.limit ?? 10);
    const offset = Number(request.params?.['offset'] ?? request.queries?.offset ?? 0);
    const results = mockProductDtos.slice(offset, offset + limit);

    return this.respond({
      limit,
      offset,
      count: results.length,
      total: mockProductDtos.length,
      results,
    });
  }

  public override getMe(): Observable<CustomerGetResponse> {
    return this.respond({ ...this.customer });
  }

  public override updateMe(
    request: PostRequest<{ B: CustomerUpdateBody }>,
  ): Observable<CustomerPatchResponse> {
    const actions = request.body?.actions ?? [];
    let next = { ...this.customer };

    for (const action of actions) {
      if (action.action === 'setFirstName') {
        next = { ...next, firstName: action.firstName ?? next.firstName };
      } else if (action.action === 'setLastName') {
        next = { ...next, lastName: action.lastName ?? next.lastName };
      } else if (action.action === 'setDateOfBirth') {
        next = { ...next, dateOfBirth: action.dateOfBirth };
      }
    }

    next = {
      ...next,
      version: next.version + 1,
      lastModifiedAt: '2026-08-30T00:00:00.000Z',
    };
    this.customer = next;

    return this.respond({ ...next });
  }

  private respond<T>(data: T): Observable<T> {
    return of(data).pipe(delay(MOCK_DELAY_MS));
  }
}
