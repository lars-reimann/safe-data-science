# `#!sds abstract class` MyClass3 {#tests.generation.markdown.classes.documented.MyClass3 data-toc-label='MyClass3'}

Description of MyClass3.

**Type parameters:**

| Name | Upper Bound | Description | Default |
|------|-------------|-------------|---------|
| `TypeParam1` | `#!sds Any?` | Description of TypeParam1. | - |
| `TypeParam2` | [`MyClass1`][tests.generation.markdown.classes.documented.MyClass1] | Description of TypeParam2. | - |
| `TypeParam3` | `#!sds Any?` | Description of TypeParam3. | [`MyClass1`][tests.generation.markdown.classes.documented.MyClass1] |

??? quote "Source code in `main.sdsstub`"

    ```sds linenums="20"
    class MyClass3<TypeParam1, TypeParam2 sub MyClass1, TypeParam3 = MyClass1>
    ```