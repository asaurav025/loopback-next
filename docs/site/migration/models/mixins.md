---
lang: en
title: 'Migrating model mixins'
keywords: LoopBack 4.0, LoopBack 4, LoopBack 3, Migration
sidebar: lb4_sidebar
permalink: /doc/en/lb4/migration-models-mixins.html
---

## Introduction

This document will guide you in migrating custom model mixins, and custom method mixins in LoopBack 3 to
their equivalent implementations in LoopBack 4.

For an understanding of how models in LoopBack 3 are now architectually decoupled into 3 classes (model, repository, controller) please read [Migrating custom model methods](./methods.md).

In LoopBack 3, it was easy to add property mixins and method [mixins](https://loopback.io/doc/en/lb3/Defining-mixins.html).

In LoopBack 4, it is also easy and is accomplished by using the mixin class factory.


## LoopBack 3 Approach to Creating Model Property Mixin

In LoopBack 3, a developer is able to create a model property mixin by:

- placing the mixin logic a file in a mixins directory
- updating the server/model-config.json file with the mixin directory location
- updating the model's json file to include the mixin's name 


The developer defines a model property mixin in **common/mixins/category.js** which adds a required property named `category` to any model.

```js
module.exports = function(Model, options) {
    Model.defineProperty('category', {type: "string", required:true});  
}
```

The **server/model-config.json** needs to contain:

- the locations of all **models** 
- the location of all **mixins**
- the entry of the model you wish to extend (for this example `Note`)

```json
{
  "_meta": {
    "sources": [
      "loopback/common/models",
      "loopback/server/models",
      "../common/models",
      "./models"
    ],
    "mixins": [
      "loopback/common/mixins",
      "loopback/server/mixins",
      "../common/mixins",
      "./mixins"
    ]
  },

 // ... other entries 

  "Note": {
    "dataSource": "db"
  }
}

```

To extend the model `Note` with the **category** mixin, we need to add a **mixins** section **common/models/note.json** to indicate which mixins should by applied to it.

```json
{
  "name": "Note",
  "properties": {
    "title": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "string"
    }
  },
  "mixins": {
    "Category": true
  }
}
```

Specifying a value of **true** for "Category" will apply the **category.js** property model mixin to the `Note` model. A value of **false** will not apply the mixin.



## LoopBack 4 Approach to Creating Model Property Mixin











