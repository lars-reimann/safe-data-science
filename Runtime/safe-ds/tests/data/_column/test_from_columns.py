from safe_ds.data import Column, Table, IntColumnType

import pandas as pd


def test_from_columns():
    table_expected = Table.from_csv("tests/resources/test_column_table.csv")
    columns_table: list[Column] = [
        Column(pd.Series([1, 4]), "A", IntColumnType()),
        Column(pd.Series([2, 5]), "B", IntColumnType()),
    ]
    table_restored: Table = Table.from_columns(columns_table)

    assert table_restored._data.equals(table_expected._data)
