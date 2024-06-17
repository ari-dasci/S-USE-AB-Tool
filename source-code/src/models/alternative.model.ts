export interface AlternativeFormData {
  alias: string;
  url: string;
  visible: boolean;
  logo?: string;
}

export interface Alternative extends AlternativeFormData {
  id: number;
  testStatus: Map<number, "UNANSWERED"| "INPROGRESS"| "ANSWERED">;
}
