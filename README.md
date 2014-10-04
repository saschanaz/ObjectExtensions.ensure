ObjectExtensions.ensure
=======================

Simple JavaScript object type checker.

# API

```typescript
declare module ObjectExtensions {
    function ensure(object: any, type: any): boolean;
}
```

# Example

```javascript
// type checking for objects themselves
ObjectExtensions.ensure("abc", "string"); // true
ObjectExtensions.ensure(true, "boolean"); // true

// type checking for primitive-typed properties
ObjectExtensions.ensure({ str: "abc" }, { str: "string"}); // true
ObjectExtensions.ensure({ str: 3 }, { str: "string"}); // false

// type checking for non-primitive-typed properties
ObjectExtensions.ensure({ str: new String("abc") }, { str: String }); // true
ObjectExtensions.ensure({ body: document.body }, { body: HTMLBodyElement }); // true
ObjectExtensions.ensure({ body: document.body }, { body: HTMLElement }); // true
ObjectExtensions.ensure({ body: document.body }, { body: HTMLSpanElement }); // false

// Nested type checking
ObjectExtensions.ensure({ obj: { prop: 3 } }, { obj: { prop: "number" } }); // true
ObjectExtensions.ensure(
  {
    obj: {
      prop: document,
      other: true
    },
    homu: {
      kawaii: 4,
      utsukushii: true
    }
  },
  {
    obj: {
      prop: Document,
      other: "boolean"
    },
    homu: {
      kawaii: "number",
      utsukushii: "boolean"
    }
  }); // true

// Checking mere existence
ObjectExtensions.ensure({ prop: true }, { prop: null }); // true
ObjectExtensions.ensure({ prop: true }, { src: null }); // false

// Checking nonexistence
ObjectExtensions.ensure({ prop: true }, { prop: undefined }); // false
ObjectExtensions.ensure({ prop: true }, { src: undefined }); // true
```
