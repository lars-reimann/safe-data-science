import pytest
from safe_ds.classification import RandomForest as RandomForestClassifier
from safe_ds.data import SupervisedDataset, Table
from safe_ds.exceptions import LearningError


def test_logistic_regression_fit():
    table = Table.from_csv("tests/resources/test_random_forest.csv")
    supervised_dataset = SupervisedDataset(table, "T")
    log_regression = RandomForestClassifier()
    log_regression.fit(supervised_dataset)
    assert True  # This asserts that the fit method succeeds


def test_logistic_regression_fit_invalid():
    table = Table.from_csv("tests/resources/test_random_forest_invalid.csv")
    supervised_dataset = SupervisedDataset(table, "T")
    log_regression = RandomForestClassifier()
    with pytest.raises(LearningError):
        log_regression.fit(supervised_dataset)
