# :test_tube:{ title="Experimental" } <code class="doc-symbol doc-symbol-class"></code> `TimeSeriesDataset` {#safeds.data.labeled.containers.TimeSeriesDataset data-toc-label='[class] TimeSeriesDataset'}

A time series dataset maps feature and time columns to a target column.

Unlike a TabularDataset, a TimeSeries needs to contain one target and one time column, but can have empty features.

**Parent type:** [`Dataset<Table, Column<Any?>>`][safeds.data.labeled.containers.Dataset]

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `data` | `#!sds union<Map<String, List<Any>>, Table>` | The data. | - |
| `targetName` | [`String`][safeds.lang.String] | The name of the target column. | - |
| `timeName` | [`String`][safeds.lang.String] | The name of the time column. | - |
| `windowSize` | [`Int`][safeds.lang.Int] | The number of consecutive sample to use as input for prediction. | - |
| `extraNames` | [`List<String>?`][safeds.lang.List] | Names of the columns that are neither features nor target. If None, no extra columns are used, i.e. all but the target column are used as features. | `#!sds null` |
| `forecastHorizon` | [`Int`][safeds.lang.Int] | The number of time steps to predict into the future. | `#!sds 1` |

**Examples:**

```sds hl_lines="2"
pipeline example {
    // dataset = TimeSeriesDataset(
    //     {"id": [1, 2, 3], "feature": [4, 5, 6], "target": [1, 2, 3], "error":[0,0,1]},
    //     target_name="target",
    //     time_name = "id",
    //     window_size=1,
    //     extra_names=["error"],
    // )
}
```

??? quote "Stub code in `TimeSeriesDataset.sdsstub`"

    ```sds linenums="30"
    class TimeSeriesDataset(
        data: union<Map<String, List<Any>>, Table>,
        @PythonName("target_name") targetName: String,
        @PythonName("time_name") timeName: String,
        @PythonName("window_size") windowSize: Int,
        @PythonName("extra_names") extraNames: List<String>? = null,
        @PythonName("forecast_horizon") forecastHorizon: Int = 1
    ) sub Dataset<Table, Column> {
        /**
         * The feature columns of the time series dataset.
         */
        attr features: Table
        /**
         * The target column of the time series dataset.
         */
        attr target: Column<Any>
        /**
         * The time column of the time series dataset.
         */
        attr time: Column<Any>
        /**
         * The number of consecutive sample to use as input for prediction.
         */
        @PythonName("window_size") attr windowSize: Int
        /**
         * The number of time steps to predict into the future.
         */
        @PythonName("forecast_horizon") attr forecastHorizon: Int
        /**
         * Additional columns of the time series dataset that are neither features, target nor time.
         *
         * These can be used to store additional information about instances, such as IDs.
         */
        attr extras: Table

        /**
         * Return a new `Table` containing the feature columns, the target column, the time column and the extra columns.
         *
         * The original `TimeSeriesDataset` is not modified.
         *
         * @result table A table containing the feature columns, the target column, the time column and the extra columns.
         */
        @Pure
        @PythonName("to_table")
        fun toTable() -> table: Table
    }
    ```

## <code class="doc-symbol doc-symbol-attribute"></code> `extras` {#safeds.data.labeled.containers.TimeSeriesDataset.extras data-toc-label='[attribute] extras'}

Additional columns of the time series dataset that are neither features, target nor time.

These can be used to store additional information about instances, such as IDs.

**Type:** [`Table`][safeds.data.tabular.containers.Table]

## <code class="doc-symbol doc-symbol-attribute"></code> `features` {#safeds.data.labeled.containers.TimeSeriesDataset.features data-toc-label='[attribute] features'}

The feature columns of the time series dataset.

**Type:** [`Table`][safeds.data.tabular.containers.Table]

## <code class="doc-symbol doc-symbol-attribute"></code> `forecastHorizon` {#safeds.data.labeled.containers.TimeSeriesDataset.forecastHorizon data-toc-label='[attribute] forecastHorizon'}

The number of time steps to predict into the future.

**Type:** [`Int`][safeds.lang.Int]

## <code class="doc-symbol doc-symbol-attribute"></code> `target` {#safeds.data.labeled.containers.TimeSeriesDataset.target data-toc-label='[attribute] target'}

The target column of the time series dataset.

**Type:** [`Column<Any>`][safeds.data.tabular.containers.Column]

## <code class="doc-symbol doc-symbol-attribute"></code> `time` {#safeds.data.labeled.containers.TimeSeriesDataset.time data-toc-label='[attribute] time'}

The time column of the time series dataset.

**Type:** [`Column<Any>`][safeds.data.tabular.containers.Column]

## <code class="doc-symbol doc-symbol-attribute"></code> `windowSize` {#safeds.data.labeled.containers.TimeSeriesDataset.windowSize data-toc-label='[attribute] windowSize'}

The number of consecutive sample to use as input for prediction.

**Type:** [`Int`][safeds.lang.Int]

## <code class="doc-symbol doc-symbol-function"></code> `toTable` {#safeds.data.labeled.containers.TimeSeriesDataset.toTable data-toc-label='[function] toTable'}

Return a new `Table` containing the feature columns, the target column, the time column and the extra columns.

The original `TimeSeriesDataset` is not modified.

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `table` | [`Table`][safeds.data.tabular.containers.Table] | A table containing the feature columns, the target column, the time column and the extra columns. |

??? quote "Stub code in `TimeSeriesDataset.sdsstub`"

    ```sds linenums="72"
    @Pure
    @PythonName("to_table")
    fun toTable() -> table: Table
    ```