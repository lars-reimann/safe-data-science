[//]: # (DO NOT EDIT THIS FILE DIRECTLY. Instead, edit the corresponding stub file and execute `npm run docs:api`.)

# <code class="doc-symbol doc-symbol-segment"></code> `mySegment5` {#tests.generation.markdown.segments.undocumented.mySegment5 data-toc-label='[segment] mySegment5'}

**Results:**

| Name | Type | Description |
|------|------|-------------|
| `result1` | `#!sds Int` | - |
| `result2` | `#!sds Float` | - |

??? quote "Implementation code in `main.sds`"

    ```sds linenums="11"
    segment mySegment5() -> (result1: Int, result2: Float) {
        yield result1 = 1;
        yield result2 = 2.0;
    }
    ```
    { data-search-exclude }
