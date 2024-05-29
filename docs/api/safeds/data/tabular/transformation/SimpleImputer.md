# <code class="doc-symbol doc-symbol-class"></code> `SimpleImputer` {#safeds.data.tabular.transformation.SimpleImputer data-toc-label='[class] SimpleImputer'}

Replace missing values with the given strategy.

**Parent type:** [`TableTransformer`][safeds.data.tabular.transformation.TableTransformer]

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `strategy` | [`Strategy`][safeds.data.tabular.transformation.SimpleImputer.Strategy] | The strategy used to impute missing values. | - |
| `columnNames` | `#!sds union<List<String>, String?>` | The list of columns used to fit the transformer. If `None`, all columns are used. | `#!sds null` |
| `valueToReplace` | `#!sds union<Float, String?>` | The value that should be replaced. | `#!sds null` |

**Examples:**

```sds hl_lines="3"
pipeline example {
   val table = Table({"a": [1, null], "b": [3, 4]});
   val imputer = SimpleImputer(SimpleImputer.Strategy.Mean, columnNames = "a").fit(table);
   val transformedTable = imputer.transform(table);
   // Table({"a": [1, 1], "b": [3, 4]})
}
```
```sds hl_lines="3"
pipeline example {
   val table = Table({"a": [1, null], "b": [3, 4]});
   val imputer = SimpleImputer(SimpleImputer.Strategy.Constant(0), columnNames = "a").fit(table);
   val transformedTable = imputer.transform(table);
   // Table({"a": [1, 0], "b": [3, 4]})
}
```

??? quote "Stub code in `SimpleImputer.sdsstub`"

    ```sds linenums="29"
    class SimpleImputer(
        strategy: SimpleImputer.Strategy,
        @PythonName("column_names") columnNames: union<List<String>, String, Nothing?> = null,
        @PythonName("value_to_replace") valueToReplace: union<Float, String, Nothing?> = null
    ) sub TableTransformer {
        /**
         * Various strategies to replace missing values.
         */
        enum Strategy {
            /**
             * Replace missing values with the given constant value.
             *
             * @param value The value to replace missing values.
             */
            @PythonName("constant")
            Constant(value: Any)

            /**
             * Replace missing values with the mean of each column.
             */
            @PythonName("mean")
            Mean

            /**
             * Replace missing values with the median of each column.
             */
            @PythonName("median")
            Median

            /**
             * Replace missing values with the mode of each column.
             */
            @PythonName("mode")
            Mode
        }

        /**
         * The strategy used to replace missing values.
         */
        attr strategy: SimpleImputer.Strategy
        /**
         * The value that should be replaced.
         */
        @PythonName("value_to_replace") attr valueToReplace: Any

        /**
         * Learn a transformation for a set of columns in a table.
         *
         * This transformer is not modified.
         *
         * @param table The table used to fit the transformer.
         *
         * @result fittedTransformer The fitted transformer.
         */
        @Pure
        fun fit(
            table: Table
        ) -> fittedTransformer: SimpleImputer

        /**
         * Learn a transformation for a set of columns in a table and apply the learned transformation to the same table.
         *
         * **Note:** Neither this transformer nor the given table are modified.
         *
         * @param table The table used to fit the transformer. The transformer is then applied to this table.
         *
         * @result fittedTransformer The fitted transformer.
         * @result transformedTable The transformed table.
         */
        @Pure
        @PythonName("fit_and_transform")
        fun fitAndTransform(
            table: Table
        ) -> (fittedTransformer: SimpleImputer, transformedTable: Table)
    }
    ```

## <code class="doc-symbol doc-symbol-attribute"></code> `isFitted` {#safeds.data.tabular.transformation.SimpleImputer.isFitted data-toc-label='[attribute] isFitted'}

Whether the transformer is fitted.

**Type:** [`Boolean`][safeds.lang.Boolean]

## <code class="doc-symbol doc-symbol-attribute"></code> `strategy` {#safeds.data.tabular.transformation.SimpleImputer.strategy data-toc-label='[attribute] strategy'}

The strategy used to replace missing values.

**Type:** [`Strategy`][safeds.data.tabular.transformation.SimpleImputer.Strategy]

## <code class="doc-symbol doc-symbol-attribute"></code> `valueToReplace` {#safeds.data.tabular.transformation.SimpleImputer.valueToReplace data-toc-label='[attribute] valueToReplace'}

The value that should be replaced.

**Type:** [`Any`][safeds.lang.Any]

## <code class="doc-symbol doc-symbol-function"></code> `fit` {#safeds.data.tabular.transformation.SimpleImputer.fit data-toc-label='[function] fit'}

Learn a transformation for a set of columns in a table.

This transformer is not modified.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `table` | [`Table`][safeds.data.tabular.containers.Table] | The table used to fit the transformer. | - |

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `fittedTransformer` | [`SimpleImputer`][safeds.data.tabular.transformation.SimpleImputer] | The fitted transformer. |

??? quote "Stub code in `SimpleImputer.sdsstub`"

    ```sds linenums="83"
    @Pure
    fun fit(
        table: Table
    ) -> fittedTransformer: SimpleImputer
    ```

## <code class="doc-symbol doc-symbol-function"></code> `fitAndTransform` {#safeds.data.tabular.transformation.SimpleImputer.fitAndTransform data-toc-label='[function] fitAndTransform'}

Learn a transformation for a set of columns in a table and apply the learned transformation to the same table.

**Note:** Neither this transformer nor the given table are modified.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `table` | [`Table`][safeds.data.tabular.containers.Table] | The table used to fit the transformer. The transformer is then applied to this table. | - |

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `fittedTransformer` | [`SimpleImputer`][safeds.data.tabular.transformation.SimpleImputer] | The fitted transformer. |
| `transformedTable` | [`Table`][safeds.data.tabular.containers.Table] | The transformed table. |

??? quote "Stub code in `SimpleImputer.sdsstub`"

    ```sds linenums="98"
    @Pure
    @PythonName("fit_and_transform")
    fun fitAndTransform(
        table: Table
    ) -> (fittedTransformer: SimpleImputer, transformedTable: Table)
    ```

## <code class="doc-symbol doc-symbol-function"></code> `transform` {#safeds.data.tabular.transformation.SimpleImputer.transform data-toc-label='[function] transform'}

Apply the learned transformation to a table.

**Note:** The given table is not modified.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `table` | [`Table`][safeds.data.tabular.containers.Table] | The table to which the learned transformation is applied. | - |

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `transformedTable` | [`Table`][safeds.data.tabular.containers.Table] | The transformed table. |

??? quote "Stub code in `TableTransformer.sdsstub`"

    ```sds linenums="39"
    @Pure
    fun transform(
        table: Table
    ) -> transformedTable: Table
    ```

## <code class="doc-symbol doc-symbol-enum"></code> `Strategy` {#safeds.data.tabular.transformation.SimpleImputer.Strategy data-toc-label='[enum] Strategy'}

Various strategies to replace missing values.

??? quote "Stub code in `SimpleImputer.sdsstub`"

    ```sds linenums="37"
    enum Strategy {
        /**
         * Replace missing values with the given constant value.
         *
         * @param value The value to replace missing values.
         */
        @PythonName("constant")
        Constant(value: Any)

        /**
         * Replace missing values with the mean of each column.
         */
        @PythonName("mean")
        Mean

        /**
         * Replace missing values with the median of each column.
         */
        @PythonName("median")
        Median

        /**
         * Replace missing values with the mode of each column.
         */
        @PythonName("mode")
        Mode
    }
    ```

### <code class="doc-symbol doc-symbol-variant"></code> `Constant` {#safeds.data.tabular.transformation.SimpleImputer.Strategy.Constant data-toc-label='[variant] Constant'}

Replace missing values with the given constant value.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `value` | [`Any`][safeds.lang.Any] | The value to replace missing values. | - |

### <code class="doc-symbol doc-symbol-variant"></code> `Mean` {#safeds.data.tabular.transformation.SimpleImputer.Strategy.Mean data-toc-label='[variant] Mean'}

Replace missing values with the mean of each column.

### <code class="doc-symbol doc-symbol-variant"></code> `Median` {#safeds.data.tabular.transformation.SimpleImputer.Strategy.Median data-toc-label='[variant] Median'}

Replace missing values with the median of each column.

### <code class="doc-symbol doc-symbol-variant"></code> `Mode` {#safeds.data.tabular.transformation.SimpleImputer.Strategy.Mode data-toc-label='[variant] Mode'}

Replace missing values with the mode of each column.