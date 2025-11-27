참고: 이 저장소는 [a7650/vue3-draggable-resizable/main-branch]의 유지 관리된 fork입니다. 원래 저장소는 2022년 이후로 비활성화된 것으로 보입니다. 개발을 계속하고, 버그를 수정하고, 새로운 기능을 추가하기 위해 fork 했습니다.

<p align="center"><img src="https://github.com/hae-long/vue3-draggable-resizable/blob/main/docs/logo.png" alt="logo"></p>

<h1 align="center">Vue3-Draggable-Resizable</h1>
<div align="center">

[![npm version](https://badge.fury.io/js/vue3-draggable-resizable.svg)](https://www.npmjs.com/package/vue3-draggable-resizable)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue3-draggable-resizable.svg?style=flat-square)](https://www.npmjs.com/package/vue3-draggable-resizable)
[![vue version](https://img.shields.io/badge/vue_version->=3-brightgreen.svg?style=flat-square)](https://github.com/hae-long/vue3-draggable-resizable)

</div>

> [Vue3 컴포넌트] 드래그하여 위치와 크기를 조정할 수 있는 컴포넌트로, 충돌 감지, 요소 스냅 정렬, 실시간 참조선을 지원합니다.

## 문서 목차

- [특징](#특징)
- [사용법](#사용법)
  - [컴포넌트 Props](#props)
  - [컴포넌트 Events](#events)
  - [스냅 정렬 기능 사용하기](#스냅-정렬-기능-사용하기)

### 특징

- 드래그와 크기 조정 지원, 각각 개별적으로 활성화/비활성화 가능
- 크기 조정 핸들 커스터마이징 (8개 방향 조작 가능, 각각 활성화/비활성화 가능)
- 부모 노드 내에서 드래그와 크기 조정 제한
- 컴포넌트 내 다양한 클래스명 커스터마이징
- 크기 조정 핸들의 클래스명도 커스터마이징 가능
- 요소 스냅 정렬
- 실시간 참조선
- 사용자 정의 참조선
- Vue3와 TypeScript 사용

### 사용법

```bash
$ npm install vue3-draggable-resizable
```

use 메서드로 컴포넌트 등록

```js
// >main.js
import { createApp } from 'vue'
import App from './App.vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
// 기본 스타일 import 필요
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

// Vue3DraggableResizable이라는 전역 컴포넌트를 얻게 됩니다
createApp(App)
  .use(Vue3DraggableResizable)
  .mount('#app')
```

컴포넌트 내부에서 개별적으로 사용할 수도 있습니다

```js
// >component.js
import { defineComponent } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
// 기본 스타일 import 필요
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

export default defineComponent({
  components: { Vue3DraggableResizable }
  // ...기타
})
```

아래는 vue-template 문법을 사용한 예제입니다

```vue
<template>
  <div id="app">
    <div class="parent">
      <Vue3DraggableResizable
        :initW="110"
        :initH="120"
        v-model:x="x"
        v-model:y="y"
        v-model:w="w"
        v-model:h="h"
        v-model:active="active"
        :draggable="true"
        :resizable="true"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-start="print('drag-start')"
        @resize-start="print('resize-start')"
        @dragging="print('dragging')"
        @resizing="print('resizing')"
        @drag-end="print('drag-end')"
        @resize-end="print('resize-end')"
      >
        테스트 예제입니다
      </Vue3DraggableResizable>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
// 기본 스타일
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
export default defineComponent({
  components: { Vue3DraggableResizable },
  data() {
    return {
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false
    }
  },
  methods: {
    print(val) {
      console.log(val)
    }
  }
})
</script>
<style>
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
}
</style>
```

### Props

#### initW

type: `Number`<br>
default: `null`<br>

초기 너비 설정 (px)

```html
<Vue3DraggableResizable :initW="100" />
```

#### initH

type: `Number`<br>
default: `null`<br>

초기 높이 설정 (px)

```html
<Vue3DraggableResizable :initH="100" />
```

#### w

type: `Number`<br>
default: `0`<br>

컴포넌트의 현재 너비 (px)<br>
"v-model:w" 문법을 사용하여 부모 컴포넌트와 동기화할 수 있습니다

```html
<Vue3DraggableResizable v-model:w="100" />
```

#### h

type: `Number`<br>
default: `0`<br>

컴포넌트의 현재 높이 (px)<br>
"v-model:h" 문법을 사용하여 부모 컴포넌트와 동기화할 수 있습니다

```html
<Vue3DraggableResizable v-model:h="100" />
```

#### x

type: `Number`<br>
default: `0`<br>

부모 컨테이너의 왼쪽으로부터의 거리 (px)<br>
"v-model:x" 문법을 사용하여 부모 컴포넌트와 동기화할 수 있습니다

```html
<Vue3DraggableResizable v-model:x="100" />
```

#### y

type: `Number`<br>
default: `0`<br>

부모 컨테이너의 상단으로부터의 거리 (px)<br>
"v-model:y" 문법을 사용하여 부모 컴포넌트와 동기화할 수 있습니다

```html
<Vue3DraggableResizable v-model:y="100" />
```

#### minW

type: `Number`<br>
default: `20`<br>

컴포넌트의 최소 너비 (px)

```html
<Vue3DraggableResizable :minW="100" />
```

#### minH

type: `Number`<br>
default: `20`<br>

컴포넌트의 최소 높이 (px)

```html
<Vue3DraggableResizable :minH="100" />
```

#### active

type: `Boolean`<br>
default: `false`<br>

컴포넌트가 현재 활성 상태인지 여부<br>
"v-model:active" 문법을 사용하여 부모 컴포넌트와 동기화할 수 있습니다

```html
<Vue3DraggableResizable v-model:active="true" />
```

#### draggable

type: `Boolean`<br>
default: `true`<br>

컴포넌트를 드래그할 수 있는지 여부

```html
<Vue3DraggableResizable :draggable="true" />
```

#### resizable

type: `Boolean`<br>
default: `true`<br>

컴포넌트의 크기를 조정할 수 있는지 여부

```html
<Vue3DraggableResizable :resizable="true" />
```

#### lockAspectRatio

type: `Boolean`<br>
default: `false`<br>

가로세로 비율을 잠글지 여부를 설정합니다

```html
<Vue3DraggableResizable :lockAspectRatio="true" />
```

#### disabledX

type: `Boolean`<br>
default: `false`<br>

X축 이동을 비활성화할지 여부

```html
<Vue3DraggableResizable :disabledX="true" />
```

#### disabledY

type: `Boolean`<br>
default: `false`<br>

Y축 이동을 비활성화할지 여부

```html
<Vue3DraggableResizable :disabledY="true" />
```

#### disabledW

type: `Boolean`<br>
default: `false`<br>

너비 수정을 비활성화할지 여부

```html
<Vue3DraggableResizable :disabledW="true" />
```

#### disabledH

type: `Boolean`<br>
default: `false`<br>

높이 수정을 비활성화할지 여부

```html
<Vue3DraggableResizable :disabledH="true" />
```

#### parent

type: `Boolean`<br>
default: `false`<br>

드래그와 크기 조정을 부모 노드 내로 제한할지 여부, 즉 컴포넌트가 부모 노드를 벗어나지 않음 (기본값: 비활성화)

```html
<Vue3DraggableResizable :parent="true" />
```

#### handles

type: `Array`<br>
default: `['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br']`

크기 조정 핸들 정의 (총 8개 방향)

- `tl` : 상단 왼쪽
- `tm` : 상단 중앙
- `tr` : 상단 오른쪽
- `mr` : 중앙 오른쪽
- `ml` : 중앙 왼쪽
- `bl` : 하단 왼쪽
- `bm` : 하단 중앙
- `br` : 하단 오른쪽

```html
<Vue3DraggableResizable :handles="['tl','tr','bl','br']" />
```

#### classNameDraggable

type: `String`<br>
default: `draggable`

컴포넌트가 "드래그 가능"할 때 표시되는 클래스명을 커스터마이징합니다

```html
<Vue3DraggableResizable classNameDraggable="draggable" />
```

#### classNameResizable

type: `String`<br>
default: `resizable`

컴포넌트가 "크기 조정 가능"할 때 표시되는 클래스명을 커스터마이징합니다

```html
<Vue3DraggableResizable classNameResizable="resizable" />
```

#### classNameDragging

type: `String`<br>
default: `dragging`

컴포넌트가 드래그 중일 때 표시되는 클래스명을 정의합니다

```html
<Vue3DraggableResizable classNameDragging="dragging" />
```

#### classNameResizing

type: `String`<br>
default: `resizing`

컴포넌트가 크기 조정 중일 때 표시되는 클래스명을 정의합니다

```html
<Vue3DraggableResizable classNameResizing="resizing" />
```

#### classNameActive

type: `String`<br>
default: `active`

컴포넌트가 활성 상태일 때의 클래스명을 정의합니다

```html
<Vue3DraggableResizable classNameActive="active"></Vue3DraggableResizable>
```

#### classNameHandle

type: `String`<br>
default: `handle`

크기 조정 핸들의 클래스명을 정의합니다

```html
<Vue3DraggableResizable classNameHandle="my-handle" />
```

위 설정은 다음과 같은 크기 조정 핸들 노드를 렌더링합니다 (my-handle-\*)

```html
...
<div class="vdr-handle vdr-handle-tl my-handle my-handle-tl"></div>
<div class="vdr-handle vdr-handle-tm my-handle my-handle-tm"></div>
<div class="vdr-handle vdr-handle-tr my-handle my-handle-tr"></div>
<div class="vdr-handle vdr-handle-ml my-handle my-handle-mr"></div>
...
```

### Events

#### activated

payload: `-`

컴포넌트가 비활성 상태에서 활성 상태로 전환될 때 발생

```html
<Vue3DraggableResizable @activated="activatedHandle" />
```

#### deactivated

payload: `-`

컴포넌트가 활성 상태에서 비활성 상태로 전환될 때 발생

```html
<Vue3DraggableResizable @deactivated="deactivatedHandle" />
```

#### drag-start

payload: `{ x: number, y: number }`

컴포넌트가 드래그를 시작할 때 발생

```html
<Vue3DraggableResizable @drag-start="dragStartHandle" />
```

#### dragging

payload: `{ x: number, y: number }`

컴포넌트가 드래그되는 동안 지속적으로 발생

```html
<Vue3DraggableResizable @dragging="draggingHandle" />
```

#### drag-end

payload: `{ x: number, y: number }`

컴포넌트가 드래그를 종료할 때 발생

```html
<Vue3DraggableResizable @drag-end="dragEndHandle" />
```

#### resize-start

payload: `{ x: number, y: number, w: number, h: number }`

컴포넌트가 크기 조정을 시작할 때 발생

```html
<Vue3DraggableResizable @resize-start="resizeStartHandle" />
```

#### resizing

payload: `{ x: number, y: number, w: number, h: number }`

컴포넌트가 크기 조정되는 동안 지속적으로 발생

```html
<Vue3DraggableResizable @resizing="resizingHandle" />
```

#### resize-end

payload: `{ x: number, y: number, w: number, h: number }`

컴포넌트가 크기 조정을 종료할 때 발생

```html
<Vue3DraggableResizable @resize-end="resizeEndHandle" />
```

### 스냅 정렬 기능 사용하기

스냅 정렬 기능은 드래그 중에 다른 요소와 자동으로 정렬됩니다. 사용자 정의 정렬 기준선도 설정할 수 있습니다.

이 기능을 사용하려면 다른 컴포넌트를 import해야 합니다.

아래와 같이 Vue3DraggableResizable을 DraggableContainer 안에 배치합니다:

```vue
<template>
  <div id="app">
    <div class="parent">
      <DraggableContainer>
        <Vue3DraggableResizable>
          테스트
        </Vue3DraggableResizable>
        <Vue3DraggableResizable>
          다른 테스트
        </Vue3DraggableResizable>
      </DraggableContainer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
// 이 컴포넌트는 기본 export가 아닙니다.
// "app.use(Vue3DraggableResizable)"로 등록했다면,
// 여기서 다시 import할 필요가 없습니다. DraggableContainer가 이미 전역 등록되어 있어 바로 사용할 수 있습니다.
import { DraggableContainer } from 'vue3-draggable-resizable'
// 기본 스타일
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
export default defineComponent({
  components: { Vue3DraggableResizable, DraggableContainer }
})
</script>
<style>
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
}
</style>
```

### DraggableContainer Props

이 props는 DraggableContainer 컴포넌트에 적용됩니다

#### disabled

type: `Boolean`<br>
default: `false`<br>

스냅 정렬 기능을 비활성화합니다

```html
<DraggableContainer :disabled="true">
  <Vue3DraggableResizable>
    테스트
  </Vue3DraggableResizable>
  <Vue3DraggableResizable>
    다른 테스트
  </Vue3DraggableResizable>
</DraggableContainer>
```

#### adsorbParent

type: `Boolean`<br>
default: `true`<br>

부모 컴포넌트와 정렬할지 여부입니다. 활성화하면 요소를 부모 컨테이너 가장자리(부모 컨테이너의 상중하좌중우 변)로 드래그할 때 스냅이 발생하고, 그렇지 않으면 발생하지 않습니다.

```html
<DraggableContainer :adsorbParent="false">
  <Vue3DraggableResizable>
    테스트
  </Vue3DraggableResizable>
  <Vue3DraggableResizable>
    다른 테스트
  </Vue3DraggableResizable>
</DraggableContainer>
```

#### adsorbCols

type: `Array<Number>`<br>
default: `null`<br>

사용자 정의 열 기준선입니다. 요소가 X축에서 이 선들 근처로 드래그될 때 스냅이 발생합니다.

```html
<DraggableContainer :adsorbCols="[10,20,30]">
  <Vue3DraggableResizable>
    테스트
  </Vue3DraggableResizable>
  <Vue3DraggableResizable>
    다른 테스트
  </Vue3DraggableResizable>
</DraggableContainer>
```

#### adsorbRows

type: `Array<Number>`<br>
default: `null`<br>

사용자 정의 행 기준선입니다. 요소가 Y축에서 이 선들 근처로 드래그될 때 스냅이 발생합니다.

```html
<DraggableContainer :adsorbRows="[10,20,30]">
  <Vue3DraggableResizable>
    테스트
  </Vue3DraggableResizable>
  <Vue3DraggableResizable>
    다른 테스트
  </Vue3DraggableResizable>
</DraggableContainer>
```

#### referenceLineVisible

type: `Boolean`<br>
default: `true`<br>

실시간 참조선 표시 여부입니다. 요소가 자동 스냅된 후 참조선이 나타납니다. 필요하지 않으면 이 옵션으로 끌 수 있습니다.

```html
<DraggableContainer :referenceLineVisible="false">
  <Vue3DraggableResizable>
    테스트
  </Vue3DraggableResizable>
  <Vue3DraggableResizable>
    다른 테스트
  </Vue3DraggableResizable>
</DraggableContainer>
```

#### referenceLineColor

type: `String`<br>
default: `#f00`<br>

실시간 참조선의 색상입니다 (기본값: 빨간색)

```html
<DraggableContainer :referenceLineColor="#0f0">
  <Vue3DraggableResizable>
    테스트
  </Vue3DraggableResizable>
  <Vue3DraggableResizable>
    다른 테스트
  </Vue3DraggableResizable>
</DraggableContainer>
```