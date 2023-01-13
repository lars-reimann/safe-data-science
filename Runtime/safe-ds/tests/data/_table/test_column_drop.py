import pytest
from safe_ds.data import Table
from safe_ds.exceptions import UnknownColumnNameError


def test_table_column_drop() -> None:
    table = Table.from_csv("tests/resources/test_table_read_csv.csv")
    transformed_table = table.drop_columns(["A"])
    assert transformed_table.schema.has_column(
        "B"
    ) and not transformed_table.schema.has_column("A")


def test_table_column_drop_warning() -> None:
    table = Table.from_csv("tests/resources/test_table_read_csv.csv")
    with pytest.raises(UnknownColumnNameError):
        table.drop_columns(["C"])
