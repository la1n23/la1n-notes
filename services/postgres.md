Run interactive sql shell:
```bash
psql -U postgres -d cozyhosting -h localhost -p 5432
```

Dump everything:
```bash
pg_dump -U postgres -d cozyhosting -f /tmp/out.sql --data-only -h localhost -p 5432
```

