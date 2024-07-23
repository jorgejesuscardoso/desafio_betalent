# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Exponha a porta que o Adonis usa
EXPOSE 3333

# Comando para iniciar o servidor Adonis
CMD ["npm", "run", "start"]
