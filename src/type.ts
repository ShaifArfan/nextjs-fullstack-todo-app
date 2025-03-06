interface ActionReturnType<T> {
  isSuccess: boolean;
  error?: string;
  data?: T;
}
