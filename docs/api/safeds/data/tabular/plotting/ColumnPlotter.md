# <code class="doc-symbol doc-symbol-class"></code> `ColumnPlotter` {#safeds.data.tabular.plotting.ColumnPlotter data-toc-label='[class] ColumnPlotter'}

A class that contains plotting methods for a column.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `column` | [`Column<Any>`][safeds.data.tabular.containers.Column] | The column to plot. | - |

**Examples:**

```sds
pipeline example {
    val column = Column("test", [1, 2, 3]);
    val plotter = column.plot;
}
```

??? quote "Stub code in `ColumnPlotter.sdsstub`"

    ```sds linenums="16"
    class ColumnPlotter(
        column: Column<Any>
    ) {
        /**
         * Create a box plot for the values in the column. This is only possible for numeric columns.
         *
         * @result plot The box plot as an image.
         *
         * @example
         * pipeline example {
         *     val column = Column("test", [1, 2, 3]);
         *     val boxplot = column.plot.boxPlot();
         * }
         */
        @Pure
        @PythonName("box_plot")
        fun boxPlot() -> plot: Image

        /**
         * Create a histogram for the values in the column.
         *
         * @param maxBinCount The maximum number of bins to use in the histogram. Default is 10.
         *
         * @result plot The plot as an image.
         *
         * @example
         * pipeline example {
         *     val column = Column("test", [1, 2, 3]);
         *     val histogram = column.plot.histogram();
         * }
         */
        @Pure
        fun histogram(
            @PythonName("max_bin_count") const maxBinCount: Int = 10
        ) -> plot: Image where {
            maxBinCount > 0
        }

        /**
         * Create a lag plot for the values in the column.
         *
         * @param lag The amount of lag.
         *
         * @result plot The plot as an image.
         *
         * @example
         * pipeline example {
         *     val column = Column("values", [1, 2, 3, 4]);
         *     val image = column.plot.lagPlot(2);
         * }
         */
        @Pure
        @PythonName("lag_plot")
        fun lagPlot(
            lag: Int
        ) -> plot: Image
    }
    ```

## <code class="doc-symbol doc-symbol-function"></code> `boxPlot` {#safeds.data.tabular.plotting.ColumnPlotter.boxPlot data-toc-label='[function] boxPlot'}

Create a box plot for the values in the column. This is only possible for numeric columns.

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `plot` | [`Image`][safeds.data.image.containers.Image] | The box plot as an image. |

**Examples:**

```sds hl_lines="3"
pipeline example {
    val column = Column("test", [1, 2, 3]);
    val boxplot = column.plot.boxPlot();
}
```

??? quote "Stub code in `ColumnPlotter.sdsstub`"

    ```sds linenums="30"
    @Pure
    @PythonName("box_plot")
    fun boxPlot() -> plot: Image
    ```

## <code class="doc-symbol doc-symbol-function"></code> `histogram` {#safeds.data.tabular.plotting.ColumnPlotter.histogram data-toc-label='[function] histogram'}

Create a histogram for the values in the column.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `maxBinCount` | [`Int`][safeds.lang.Int] | The maximum number of bins to use in the histogram. Default is 10. | `#!sds 10` |

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `plot` | [`Image`][safeds.data.image.containers.Image] | The plot as an image. |

**Examples:**

```sds hl_lines="3"
pipeline example {
    val column = Column("test", [1, 2, 3]);
    val histogram = column.plot.histogram();
}
```

??? quote "Stub code in `ColumnPlotter.sdsstub`"

    ```sds linenums="47"
    @Pure
    fun histogram(
        @PythonName("max_bin_count") const maxBinCount: Int = 10
    ) -> plot: Image where {
        maxBinCount > 0
    }
    ```

## <code class="doc-symbol doc-symbol-function"></code> `lagPlot` {#safeds.data.tabular.plotting.ColumnPlotter.lagPlot data-toc-label='[function] lagPlot'}

Create a lag plot for the values in the column.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `lag` | [`Int`][safeds.lang.Int] | The amount of lag. | - |

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `plot` | [`Image`][safeds.data.image.containers.Image] | The plot as an image. |

**Examples:**

```sds hl_lines="3"
pipeline example {
    val column = Column("values", [1, 2, 3, 4]);
    val image = column.plot.lagPlot(2);
}
```

??? quote "Stub code in `ColumnPlotter.sdsstub`"

    ```sds linenums="67"
    @Pure
    @PythonName("lag_plot")
    fun lagPlot(
        lag: Int
    ) -> plot: Image
    ```