# Imagem do container
FROM node:16.16.0
# Enviroment variable
ENV WORKDIR=/usr/api/app
# Indica qual é o diretório de trabalho
WORKDIR ${WORKDIR}
# Copia todos os arquivos para o workdir

# Instalar o utilitário wait-for-it
RUN apt-get update && apt-get install -y wget
RUN wget -O /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
COPY ./ ./
RUN npm i



# CMD ["npm", "start"]