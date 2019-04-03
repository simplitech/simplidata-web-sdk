import { ResponseSerialize } from '../../simpli'

export class ModelingResultItem {
  @ResponseSerialize(Number)
  coefficient?: number // Coeficiente

  @ResponseSerialize(Number)
  standardError?: number // Erro Padrão

  @ResponseSerialize(Number)
  tReason?: number // Razão-T

  @ResponseSerialize(Number)
  pValue?: number // P-Valor
}
