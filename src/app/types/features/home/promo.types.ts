// TODO: актуализировать когда завяжемся на данные с бэка
export type PromoCode = {
  id: string;
  code: string;
  description: string;
  discount: string;
  isActive: boolean;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
};
