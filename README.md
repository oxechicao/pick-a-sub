# PICK A SUB

É um simples projeto feito por hobbie para selecionar um inscrito de uma lista de inscritos da Twitch.

Não precisa instalar nada, simplesmente por pra rodar.

## Estrutura da lógica dos dados

Ao importar o csv serão geradas 3 listas no localStorage:

1. Lista com os subs ("imutável"): `cht-subs-csv`
   - Lista contento os subs, a ideia é servir de referência através de seus íncides do vetor
2. Lista de índices ordenação: `cht-subs-sort`
   - A ideia desta lista é servir para ordenar a renderização dos subs ativos no sorteio, e também servir de referência para selecionar os ganhadores
3. Lista de índices ganhadores: `cht-subs-winners`
    - Lista contendo os índices dos ganhadores
    



