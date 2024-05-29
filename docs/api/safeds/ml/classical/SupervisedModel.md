---
search:
  boost: 0.5
---

# <code class="doc-symbol doc-symbol-class"></code> `SupervisedModel` {#safeds.ml.classical.SupervisedModel data-toc-label='[class] SupervisedModel'}

A model for supervised learning tasks.

**Inheritors:**

- [`Classifier`][safeds.ml.classical.classification.Classifier]
- [`Regressor`][safeds.ml.classical.regression.Regressor]

??? quote "Stub code in `SupervisedModel.sdsstub`"

    ```sds linenums="11"
    class SupervisedModel {
        /**
         * Whether the model is fitted.
         */
        @PythonName("is_fitted") attr isFitted: Boolean

        /**
         * Create a copy of this model and fit it with the given training data.
         *
         * **Note:** This model is not modified.
         *
         * @param trainingSet The training data containing the features and target.
         *
         * @result fittedModel The fitted model.
         */
        @Pure
        fun fit(
            @PythonName("training_set") trainingSet: TabularDataset
        ) -> fittedModel: SupervisedModel

        /**
         * Predict the target values on the given dataset.
         *
         * **Note:** The model must be fitted.
         *
         * @param dataset The dataset containing at least the features.
         *
         * @result prediction The given dataset with an additional column for the predicted target values.
         */
        @Pure
        fun predict(
            dataset: union<Table, TabularDataset>
        ) -> prediction: TabularDataset

        /**
         * Return the names of the feature columns.
         *
         * **Note:** The model must be fitted.
         *
         * @result featureNames The names of the feature columns.
         */
        @Pure
        @PythonName("get_feature_names")
        fun getFeatureNames() -> featureNames: List<String>

        /**
         * Return the schema of the feature columns.
         *
         * **Note:** The model must be fitted.
         *
         * @result featureSchema The schema of the feature columns.
         */
        @Pure
        @PythonName("get_features_schema")
        fun getFeaturesSchema() -> featureSchema: Schema

        /**
         * Return the name of the target column.
         *
         * **Note:** The model must be fitted.
         *
         * @result targetName The name of the target column.
         */
        @Pure
        @PythonName("get_target_name")
        fun getTargetName() -> targetName: String

        /**
         * Return the type of the target column.
         *
         * **Note:** The model must be fitted.
         *
         * @result targetType The type of the target column.
         */
        @Pure
        @PythonName("get_target_type")
        fun getTargetType() -> targetType: DataType
    }
    ```

## <code class="doc-symbol doc-symbol-attribute"></code> `isFitted` {#safeds.ml.classical.SupervisedModel.isFitted data-toc-label='[attribute] isFitted'}

Whether the model is fitted.

**Type:** [`Boolean`][safeds.lang.Boolean]

## <code class="doc-symbol doc-symbol-function"></code> `fit` {#safeds.ml.classical.SupervisedModel.fit data-toc-label='[function] fit'}

Create a copy of this model and fit it with the given training data.

**Note:** This model is not modified.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `trainingSet` | [`TabularDataset`][safeds.data.labeled.containers.TabularDataset] | The training data containing the features and target. | - |

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `fittedModel` | [`SupervisedModel`][safeds.ml.classical.SupervisedModel] | The fitted model. |

??? quote "Stub code in `SupervisedModel.sdsstub`"

    ```sds linenums="26"
    @Pure
    fun fit(
        @PythonName("training_set") trainingSet: TabularDataset
    ) -> fittedModel: SupervisedModel
    ```

## <code class="doc-symbol doc-symbol-function"></code> `getFeatureNames` {#safeds.ml.classical.SupervisedModel.getFeatureNames data-toc-label='[function] getFeatureNames'}

Return the names of the feature columns.

**Note:** The model must be fitted.

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `featureNames` | [`List<String>`][safeds.lang.List] | The names of the feature columns. |

??? quote "Stub code in `SupervisedModel.sdsstub`"

    ```sds linenums="52"
    @Pure
    @PythonName("get_feature_names")
    fun getFeatureNames() -> featureNames: List<String>
    ```

## <code class="doc-symbol doc-symbol-function"></code> `getFeaturesSchema` {#safeds.ml.classical.SupervisedModel.getFeaturesSchema data-toc-label='[function] getFeaturesSchema'}

Return the schema of the feature columns.

**Note:** The model must be fitted.

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `featureSchema` | [`Schema`][safeds.data.tabular.typing.Schema] | The schema of the feature columns. |

??? quote "Stub code in `SupervisedModel.sdsstub`"

    ```sds linenums="63"
    @Pure
    @PythonName("get_features_schema")
    fun getFeaturesSchema() -> featureSchema: Schema
    ```

## <code class="doc-symbol doc-symbol-function"></code> `getTargetName` {#safeds.ml.classical.SupervisedModel.getTargetName data-toc-label='[function] getTargetName'}

Return the name of the target column.

**Note:** The model must be fitted.

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `targetName` | [`String`][safeds.lang.String] | The name of the target column. |

??? quote "Stub code in `SupervisedModel.sdsstub`"

    ```sds linenums="74"
    @Pure
    @PythonName("get_target_name")
    fun getTargetName() -> targetName: String
    ```

## <code class="doc-symbol doc-symbol-function"></code> `getTargetType` {#safeds.ml.classical.SupervisedModel.getTargetType data-toc-label='[function] getTargetType'}

Return the type of the target column.

**Note:** The model must be fitted.

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `targetType` | [`DataType`][safeds.data.tabular.typing.DataType] | The type of the target column. |

??? quote "Stub code in `SupervisedModel.sdsstub`"

    ```sds linenums="85"
    @Pure
    @PythonName("get_target_type")
    fun getTargetType() -> targetType: DataType
    ```

## <code class="doc-symbol doc-symbol-function"></code> `predict` {#safeds.ml.classical.SupervisedModel.predict data-toc-label='[function] predict'}

Predict the target values on the given dataset.

**Note:** The model must be fitted.

**Parameters:**

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `dataset` | `#!sds union<Table, TabularDataset>` | The dataset containing at least the features. | - |

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `prediction` | [`TabularDataset`][safeds.data.labeled.containers.TabularDataset] | The given dataset with an additional column for the predicted target values. |

??? quote "Stub code in `SupervisedModel.sdsstub`"

    ```sds linenums="40"
    @Pure
    fun predict(
        dataset: union<Table, TabularDataset>
    ) -> prediction: TabularDataset
    ```