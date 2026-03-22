# Deploy do web app Professora Carolina - App Runner + AWS Bedrock (Nova 2 Sonic) + Vercel

## PARTE 1: Deploy do Backend (AWS App Runner)

### Passo 1: Criar repositório ECR

1. Acesse CloudFormation: https://console.aws.amazon.com/cloudformation
2. Clique **"Create stack"** → **"With new resources"**
3. Em "Specify template":
   - Selecione **"Upload a template file"**
   - Clique **"Choose file"** e selecione: `cloudformation-step1-ecr.yaml` (na pasta \carolina\speech-to-speech\amazon-nova-2-sonic\repeatable-patterns\nova-sonic-speaks-first)
   - Clique **"Next"**
4. Em "Specify stack details":
   - Stack name: `professora-carolina-ecr`
   - Clique **"Next"**
5. Em "Configure stack options":
   - Deixe tudo padrão
   - Clique **"Next"**
6. Em "Review":
   - Clique **"Submit"**
7. **Aguarde ~1 minuto** até Status = **CREATE_COMPLETE**

### Passo 2: Obter URI do ECR

1. Na stack criada, clique na aba **"Outputs"**
2. Copie o valor de **`ECRRepositoryURI`**
   - Exemplo: `123456789012.dkr.ecr.us-east-1.amazonaws.com/webapp`

### Passo 3: Configurar CORS no backend

1. Edite o arquivo `src/server.ts`
2. Localize a linha 15:
   ```typescript
   const io = new Server(server);
   ```
3. Altere para (substitua pela sua URL do Vercel se for diferente):
   ```typescript
   const io = new Server(server, {
       cors: {
           origin: "https://webapp.vercel.app",
           methods: ["GET", "POST"]
       }
   });
   ```

### Passo 4: Build e Push da imagem Docker

No **PowerShell**, execute (substitua `COLE_ECR_URI` pelo valor copiado):

```powershell
cd "c:\carolina\speech-to-speech\amazon-nova-2-sonic\repeatable-patterns\nova-sonic-speaks-first"

# Build do TypeScript
npm run build

# Login no ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin COLE_ECR_URI

# Build da imagem Docker
docker build -t professora-carolina .

# Tag da imagem
docker tag professora-carolina:latest COLE_ECR_URI:latest

# Push para ECR
docker push COLE_ECR_URI:latest
```

### Passo 5: Criar App Runner

1. Volte ao CloudFormation: https://console.aws.amazon.com/cloudformation
2. Clique **"Create stack"** → **"With new resources"**
3. Em "Specify template":
   - Selecione **"Upload a template file"**
   - Clique **"Choose file"** e selecione: `cloudformation-step2-apprunner.yaml` (na pasta \carolina\speech-to-speech\amazon-nova-2-sonic\repeatable-patterns\nova-sonic-speaks-first)
   - Clique **"Next"**
4. Em "Specify stack details":
   - Stack name: `professora-carolina-apprunner`
   - ECRImageURI: Cole o URI do ECR + `:latest` (exemplo: `123456789012.dkr.ecr.us-east-1.amazonaws.com/webapp:latest`)
   - Clique **"Next"**
5. Em "Configure stack options":
   - Deixe tudo padrão
   - Clique **"Next"**
6. Em "Review":
   - Marque: **"I acknowledge that AWS CloudFormation might create IAM resources"**
   - Clique **"Submit"**
7. **Aguarde ~3-5 minutos** até Status = **CREATE_COMPLETE**

### Passo 6: Obter URL do App Runner

1. Na stack criada, clique na aba **"Outputs"**
2. Copie o valor de **`ServiceURL`**
   - Exemplo: `abc123xyz.us-east-1.awsapprunner.com`

---

## PARTE 2: Deploy do Frontend (Vercel)

### Passo 7: Atualizar URL do App Runner no frontend

1. Edite o arquivo `public/src/main.js`
2. Localize a linha 5:
   ```javascript
   const socket = io('https://');
   ```
3. Altere para (use a URL do Passo 6):
   ```javascript
   const socket = io('https://URL_DO_APP_RUNNER');
   ```

### Passo 8: Deploy no Vercel

No **PowerShell**:

```powershell
cd "c:\carolina\speech-to-speech\amazon-nova-2-sonic\repeatable-patterns\nova-sonic-speaks-first"

# Deploy
npx vercel --prod
```

Siga as perguntas:
- Login no Vercel (abre navegador)
- Set up and deploy? → **Yes**
- Which scope? → Sua conta
- Link to existing project? → **No**
- Project name? → **web-app**
- Directory? → **./public**
- Override settings? → **No**

### Passo 9: Testar

Acesse a URL que o Vercel mostrou e teste o app!

---

## Custos Estimados

- **Vercel**: Grátis
- **App Runner**: ~$5-10/mês (paga por uso)
- **Bedrock (Nova 2 Sonic)**: ~$0.024 por 1000 tokens de entrada + ~$0.096 por 1000 tokens de saída

## Troubleshooting

**Backend não inicia:**
- Verifique logs no App Runner Console
- Confirme que a imagem foi enviada para o ECR

**Frontend não conecta (erro CORS):**
- Verifique se a URL do Vercel está correta no `src/server.ts`
- Confirme que você fez rebuild e push da imagem após alterar o CORS

**Frontend não conecta (erro de conexão):**
- Verifique se a URL do App Runner está correta no `public/src/main.js`
- Confirme que o App Runner está com Status "Running"
- Abra o Console do navegador (F12) e veja erros de conexão
