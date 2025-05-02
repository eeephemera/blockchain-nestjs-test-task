# Blockchain API Test Task

Тестовое задание для вакансии Backend-разработчика.

## Задание 1: API для блокчейн-данных

REST API на NestJS для получения данных из сетей:
- EVM (Ethereum Virtual Machine)
- Cosmos

### Реализованные эндпоинты:
- `GET /evm/block/:height` - Информация о блоке EVM (height, hash, parentHash, gasLimit, gasUsed, size)
- `GET /evm/transactions/:hash` - Информация о транзакции EVM (hash, to, from, value, input, maxFeePerGas, maxPriotityFeePerGas, gasPrice)
- `GET /cosmos/block/:height` - Информация о блоке Cosmos (height, time, hash, proposedAddress)
- `GET /cosmos/transactions/:hash` - Информация о транзакции Cosmos (hash, height, time, gasUsed, gasWanted, fee, sender)

### Запуск API:
```bash
cd api
npm install
npm run start:dev
```

API будет доступно по адресу http://localhost:3000
Swagger документация: http://localhost:3000/api

## Задание 2: Оптимизация SQL запроса

Оптимизированный SQL запрос для вывода транзакций с учетом всех транзакций блоков, которые попадают в выборку.

WITH block_heights AS (
  SELECT DISTINCT block_height
  FROM test_txs
  ORDER BY block_height DESC
  LIMIT $1
)
SELECT tx.*
FROM test_txs tx
JOIN block_heights bh ON tx.block_height = bh.block_height
ORDER BY tx.block_height DESC;
