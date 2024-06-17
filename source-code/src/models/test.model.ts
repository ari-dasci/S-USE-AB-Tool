import { z } from "zod";

const EVALUATION_VALUES = [
  "QUESTIONNAIRE",
  "TEST",
  "USABILITY",
  "SUS",
  "QUEST",
  "NPS",
  "ACC",
] as const;

export const testFormSchema = z.object({
  alias: z.string(),
  name: z.string(),
  instructions: z.string(),
  type: z.enum(EVALUATION_VALUES),
});

type EvaluationTypesTuple = typeof EVALUATION_VALUES;

export type EvaluationTypes = EvaluationTypesTuple[number];

export type TestFormData = z.infer<typeof testFormSchema>;

export interface Test extends TestFormData {
  id: number;
}

export interface QuestionCategory {
  id: number;
  test?: number;
  title: string;
  description?: string;
}

export interface TestQuestion {
  index: number;
  title: string;
  category?: string;
  answers: TestAnswer[];
}

export interface TestAnswer {
  id: number;
  question?: number;
  title?: string;
  value?: string | number | boolean;
}

export type TestDetail = Test & {
  questions: (TestQuestion & { answers: TestAnswer[] })[];
};
