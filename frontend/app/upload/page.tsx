import { UploadForm } from '@/components/upload/upload-form'
import { Card, CardContent } from '@/components/ui/card'
import { Info } from 'lucide-react'

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Como funciona o upload</p>
              <p className="mt-1 text-blue-700">
                Selecione um arquivo CSV para cada tipo de dado que deseja importar. 
                Os dados existentes serao substituidos pelos novos dados do arquivo.
                Certifique-se de que o arquivo contem todas as colunas necessarias.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <UploadForm />
    </div>
  )
}
