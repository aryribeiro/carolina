# Professora Carolina 🙋‍♀️

Chatbot de voz para aprender inglês usando AWS Bedrock com o modelo Nova 2 Sonic com a voz Carolina.

## Sobre

Professora Carolina é uma assistente de IA que ensina inglês de forma natural através de conversação por voz. Ela fala devagar, usa mais português que inglês, e corrige erros com paciência - como uma mãe ensinando uma criança de 7 anos.

## Tecnologias

- **Frontend**: HTML/CSS/JavaScript (Vercel)
- **Backend**: Node.js + TypeScript + Socket.IO (AWS App Runner)
- **IA**: Amazon Nova 2 Sonic (Bedrock)
- **Voz**: Carolina (voz brasileira)

## Executar Localmente

```bash
npm install
npm run build
npm start
```

Acesse: http://localhost:3000

## Deploy em Produção

Siga o guia completo em: [DEPLOY.md](./DEPLOY.md)

**Resumo:**
1. Frontend → Vercel
2. Backend → AWS App Runner

## Estrutura

```
├── public/           # Frontend (HTML/CSS/JS)
├── src/              # Backend (TypeScript)
│   ├── server.ts     # Servidor WebSocket
│   ├── client.ts     # Cliente Bedrock
│   ├── consts.ts     # Configurações
│   └── types.ts      # Tipos TypeScript
├── Dockerfile        # Container para AWS
├── cloudformation-step1-ecr.yaml      # ECR Repository
└── cloudformation-step2-apprunner.yaml  # App Runner Service
```

## Configuração

O prompt da Professora Carolina está em:
- Backend: `src/consts.ts` (DefaultSystemPrompt)
- Frontend: `public/src/main.js` (SYSTEM_PROMPT)

## Credenciais AWS

Local: usa credenciais do AWS CLI (`~/.aws/credentials`)

Produção: configurado automaticamente via IAM Role no CloudFormation

## Licença

Baseado no exemplo oficial da AWS: [amazon-nova-samples](https://github.com/aws-samples/amazon-nova-samples)

## Autor

**Ary Ribeiro**
- LinkedIn: [@aryribeiro](https://linkedin.com/in/aryribeiro)
- GitHub: [@aryribeiro](https://github.com/aryribeiro)
- Email: aryribeiro@gmail.com
