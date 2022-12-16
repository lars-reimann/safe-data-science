from __future__ import annotations

import pandas
from sklearn import preprocessing, exceptions

from safe_ds.data import Table
from safe_ds.exceptions import NotFittedError, LearningError


class LabelEncoder:
    def __init__(self):
        self.is_fitted = 0
        self.le = preprocessing.LabelEncoder()

    def fit(self, table: Table, column: str) -> None:
        """Fit the label encoder with the values in the given table.

        Parameters
        ----------
        table : Table
            The table containing the data to fit the label encoder with.

        columns : [str]
            The list of columns which should be lable encoded
        Returns
        -------
        None
            This function does not return any value. It updates the internal state of the label encoder object.

        Raises
        -------
            LearningError if the Model couldn't be fitted correctly
        """
        try:

            self.le.fit(table._data[column])
        except exceptions.NotFittedError:
            raise LearningError

    def transform(self, table: Table, column: str) -> Table:
        """Transform the given Table to a normalized encoded table.

       Parameters
        ----------
        table:
                table with target values
        column:
                name of column as string
        Returns
        -------
            Table with normalized encodings.

        Raises
        ------
            LearningError if the Model couldn't be fitted correctly or
            a NotFittedError if the Model wasn't fitted before transforming
        """
        try:
            p_df = table._data
            p_df[column] = self.le.transform(p_df[column])
            return Table(p_df)
        except exceptions.NotFittedError:
            raise NotFittedError

    def fit_transform(self, table: Table, columns: [str]) -> Table:
        """Lable encodes a given Table with the given Lable encoder

        Parameters
        ----------
            table: the table which will be transformed
            columns: list of column names to be considered while encoding

        Returns
        -------
            table: a new Table object which is label encoded

        Raises
        -------
            LearningError if model could not be fitted.
            NotFittedError if the encoder wasn't fitted before transforming.

        """
        p_df = table._data
        try:
            for col in columns:
                # Fit the LabelEncoder on the Column
                self.le.fit(p_df[col])

                # transform the column using the trained Label Encoder
                p_df[col] = self.le.transform(p_df[col])
            return Table(pandas.DataFrame(p_df))
        except exceptions.NotFittedError:
            raise NotFittedError

    def inverse_transform(self, table: Table, column: str) -> Table:
        """Inverse transform Table back to original encodings.

        Parameters
        ----------
            table:  The Table to be inverse tranformed.
            columns: The list of columns which should be lable encoded

        Returns
        -------
            table: inverse transformed table.

        Raises
        -------
            NotFittedError if the encoder wasn't fitted before transforming.
        """

        try:
            p_df = table._data
            p_df[column] = self.le.inverse_transform(p_df[column])
            return Table(p_df)
        except exceptions.NotFittedError:
            raise NotFittedError
