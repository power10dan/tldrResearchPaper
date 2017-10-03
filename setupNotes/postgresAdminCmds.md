# Login to psql Commands

## login to the super user

```
sudo -u postgres -i
```

## login to already defined superuser (this is the one you want most likely)

```
psql -d mydb -U username
```

## Define the postgres user password.
I've set this to "iamthepostgresuserpassword". See https://xkcd.com/936/ for why
```
\password postgres
```
# psql commands

## Create a schema

```
create schema "schemaName";
```

## Create a table in the schema

```
create table schemaName.tableName (col1 col1Type, col2 col2Type);
```

## Add column to table

```
alter table "schemaName.tableName" add column columnName columnType;
```

## Add all permissions to other users for table

```
grant all priviledges on database dbname to username;
```

## insert into a table;

```
insert into "schemaName.tableName"(col1, col2 ...) values (val1, val2 ...);
```

## View everything in a table, notice the lack of ""

```
select * from schemaName.tableName;
```
