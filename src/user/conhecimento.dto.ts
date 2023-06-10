import { IsNotEmpty } from "class-validator";

export class ConhecimentoDTO {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly code: number;
}
