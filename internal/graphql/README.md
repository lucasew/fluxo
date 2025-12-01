# GraphQL Package

## Status

✅ **Schema definido** - `schema.graphql` completo com queries, mutations, subscriptions
✅ **Resolvers implementados** - `schema.resolvers.go` com lógica de negócio
✅ **Mappers criados** - `mappers.go` converte tipos Rain para GraphQL
⚠️ **Code generation pendente** - Aguardando `gqlgen generate` em ambiente com rede estável

## Arquivos

- `schema.graphql` - Schema GraphQL completo
- `schema.resolvers.go` - Implementação dos resolvers (gerado pelo gqlgen)
- `generated.go` - Código gerado pelo gqlgen (parcial)
- `models_gen.go` - Modelos gerados (stub)
- `mappers.go` - Funções de mapeamento Rain → GraphQL
- `resolver.go` - Root resolver

## Próximos Passos

Para completar a geração do código GraphQL:

```bash
# Em um ambiente com rede estável
go run github.com/99designs/gqlgen@latest generate
```

Isso irá:
1. Gerar os tipos em `models_gen.go`
2. Atualizar `generated.go` com executores
3. Completar a implementação do GraphQL server

## Erros Nomeados

O package usa erros nomeados no `internal/session/errors.go`:
- `ErrTorrentNotFound`
- `ErrInvalidURI`
- `ErrAlreadyExists`
- `ErrSessionClosed`
- `ErrInvalidID`

Todos os erros usam `%w` para permitir `errors.Is()` e `errors.As()`.

## API Rain 1.13.0

Os mappers foram atualizados para a API do Rain 1.13.0:
- `Stats.Bytes.Completed` ao invés de `BytesCompleted`
- `Stats.Speed.Download/Upload`
- `t.AddedAt()` método ao invés de campo
- Tipos FileStats, Tracker e Webseed atualizados
