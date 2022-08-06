<script setup lang="ts">
import { ref } from 'vue'
import { TreeNodeData } from './components/tree-transfer'
import { TreeTransfer } from './index'

const pagedData = ref({ rows: [], total: 0 })
const value = ref([])
const data: TreeNodeData[] = [
  {
    id: '1550384448460029952',
    createTime: '2022-07-22 15:37:11',
    createdBy: '2',
    updateTime: '2022-07-22 15:37:11',
    updatedBy: '2',
    label: '一年级',
    parentId: '1550384146247843840',
    sortValue: 0,
    children: [
      {
        id: '1550384880188129280',
        createTime: '2022-07-22 15:38:54',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:54',
        updatedBy: '2',
        label: '语文',
        parentId: '1550384448460029952',
        sortValue: 0,
        echoMap: {
          basicAttributeId: '语文'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375539716390912'
      },
      {
        id: '1550384880196517888',
        createTime: '2022-07-22 15:38:54',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:54',
        updatedBy: '2',
        label: '数学',
        parentId: '1550384448460029952',
        sortValue: 1,
        echoMap: {
          basicAttributeId: '数学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375577318326272'
      },
      {
        id: '1550384880200712192',
        createTime: '2022-07-22 15:38:54',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:54',
        updatedBy: '2',
        label: '英语',
        parentId: '1550384448460029952',
        sortValue: 2,
        echoMap: {
          basicAttributeId: '英语'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375603650166784'
      },
      {
        id: '1550384880204906496',
        createTime: '2022-07-22 15:38:54',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:54',
        updatedBy: '2',
        label: '科学',
        parentId: '1550384448460029952',
        sortValue: 3,
        echoMap: {
          basicAttributeId: '科学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375652169875456'
      },
      {
        id: '1550384880204906497',
        createTime: '2022-07-22 15:38:54',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:54',
        updatedBy: '2',
        label: '道德与法治',
        parentId: '1550384448460029952',
        sortValue: 4,
        echoMap: {
          basicAttributeId: '道德与法治'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375677381836800'
      }
    ],
    echoMap: {
      basicAttributeId: '一年级'
    },
    type: {
      code: 'GRADE',
      desc: '年级'
    },
    basicAttributeId: '4'
  },
  {
    id: '1550384448464224256',
    createTime: '2022-07-22 15:37:11',
    createdBy: '2',
    updateTime: '2022-07-22 15:37:11',
    updatedBy: '2',
    label: '二年级',
    parentId: '1550384146247843840',
    sortValue: 1,
    children: [
      {
        id: '1550384896105512960',
        createTime: '2022-07-22 15:38:58',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:58',
        updatedBy: '2',
        label: '语文',
        parentId: '1550384448464224256',
        sortValue: 0,
        echoMap: {
          basicAttributeId: '语文'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375539716390912'
      },
      {
        id: '1550384896109707264',
        createTime: '2022-07-22 15:38:58',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:58',
        updatedBy: '2',
        label: '数学',
        parentId: '1550384448464224256',
        sortValue: 1,
        echoMap: {
          basicAttributeId: '数学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375577318326272'
      },
      {
        id: '1550384896113901568',
        createTime: '2022-07-22 15:38:58',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:58',
        updatedBy: '2',
        label: '英语',
        parentId: '1550384448464224256',
        sortValue: 2,
        echoMap: {
          basicAttributeId: '英语'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375603650166784'
      },
      {
        id: '1550384896118095872',
        createTime: '2022-07-22 15:38:58',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:58',
        updatedBy: '2',
        label: '科学',
        parentId: '1550384448464224256',
        sortValue: 3,
        echoMap: {
          basicAttributeId: '科学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375652169875456'
      },
      {
        id: '1550384896122290176',
        createTime: '2022-07-22 15:38:58',
        createdBy: '2',
        updateTime: '2022-07-22 15:38:58',
        updatedBy: '2',
        label: '道德与法治',
        parentId: '1550384448464224256',
        sortValue: 4,
        echoMap: {
          basicAttributeId: '道德与法治'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375677381836800'
      }
    ],
    echoMap: {
      basicAttributeId: '二年级'
    },
    type: {
      code: 'GRADE',
      desc: '年级'
    },
    basicAttributeId: '5'
  },
  {
    id: '1550384448468418560',
    createTime: '2022-07-22 15:37:11',
    createdBy: '2',
    updateTime: '2022-07-22 15:37:11',
    updatedBy: '2',
    label: '三年级',
    parentId: '1550384146247843840',
    sortValue: 2,
    children: [
      {
        id: '1550384914120048640',
        createTime: '2022-07-22 15:39:02',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:02',
        updatedBy: '2',
        label: '语文',
        parentId: '1550384448468418560',
        sortValue: 0,
        echoMap: {
          basicAttributeId: '语文'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375539716390912'
      },
      {
        id: '1550384914124242944',
        createTime: '2022-07-22 15:39:02',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:02',
        updatedBy: '2',
        label: '数学',
        parentId: '1550384448468418560',
        sortValue: 1,
        echoMap: {
          basicAttributeId: '数学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375577318326272'
      },
      {
        id: '1550384914128437248',
        createTime: '2022-07-22 15:39:02',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:02',
        updatedBy: '2',
        label: '英语',
        parentId: '1550384448468418560',
        sortValue: 2,
        echoMap: {
          basicAttributeId: '英语'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375603650166784'
      },
      {
        id: '1550384914128437249',
        createTime: '2022-07-22 15:39:02',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:02',
        updatedBy: '2',
        label: '科学',
        parentId: '1550384448468418560',
        sortValue: 3,
        echoMap: {
          basicAttributeId: '科学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375652169875456'
      },
      {
        id: '1550384914132631552',
        createTime: '2022-07-22 15:39:02',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:02',
        updatedBy: '2',
        label: '道德与法治',
        parentId: '1550384448468418560',
        sortValue: 4,
        echoMap: {
          basicAttributeId: '道德与法治'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375677381836800'
      }
    ],
    echoMap: {
      basicAttributeId: '三年级'
    },
    type: {
      code: 'GRADE',
      desc: '年级'
    },
    basicAttributeId: '6'
  },
  {
    id: '1550384448472612864',
    createTime: '2022-07-22 15:37:11',
    createdBy: '2',
    updateTime: '2022-07-22 15:37:11',
    updatedBy: '2',
    label: '四年级',
    parentId: '1550384146247843840',
    sortValue: 3,
    children: [
      {
        id: '1550384929093713920',
        createTime: '2022-07-22 15:39:06',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:06',
        updatedBy: '2',
        label: '语文',
        parentId: '1550384448472612864',
        sortValue: 0,
        echoMap: {
          basicAttributeId: '语文'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375539716390912'
      },
      {
        id: '1550384929093713921',
        createTime: '2022-07-22 15:39:06',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:06',
        updatedBy: '2',
        label: '数学',
        parentId: '1550384448472612864',
        sortValue: 1,
        echoMap: {
          basicAttributeId: '数学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375577318326272'
      },
      {
        id: '1550384929097908224',
        createTime: '2022-07-22 15:39:06',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:06',
        updatedBy: '2',
        label: '英语',
        parentId: '1550384448472612864',
        sortValue: 2,
        echoMap: {
          basicAttributeId: '英语'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375603650166784'
      },
      {
        id: '1550384929102102528',
        createTime: '2022-07-22 15:39:06',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:06',
        updatedBy: '2',
        label: '科学',
        parentId: '1550384448472612864',
        sortValue: 3,
        echoMap: {
          basicAttributeId: '科学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375652169875456'
      },
      {
        id: '1550384929102102529',
        createTime: '2022-07-22 15:39:06',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:06',
        updatedBy: '2',
        label: '道德与法治',
        parentId: '1550384448472612864',
        sortValue: 4,
        echoMap: {
          basicAttributeId: '道德与法治'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375677381836800'
      }
    ],
    echoMap: {
      basicAttributeId: '四年级'
    },
    type: {
      code: 'GRADE',
      desc: '年级'
    },
    basicAttributeId: '7'
  },
  {
    id: '1550384448476807168',
    createTime: '2022-07-22 15:37:11',
    createdBy: '2',
    updateTime: '2022-07-22 15:37:11',
    updatedBy: '2',
    label: '五年级',
    parentId: '1550384146247843840',
    sortValue: 4,
    children: [
      {
        id: '1550384943463399424',
        createTime: '2022-07-22 15:39:09',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:09',
        updatedBy: '2',
        label: '语文',
        parentId: '1550384448476807168',
        sortValue: 0,
        echoMap: {
          basicAttributeId: '语文'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375539716390912'
      },
      {
        id: '1550384943463399425',
        createTime: '2022-07-22 15:39:09',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:09',
        updatedBy: '2',
        label: '数学',
        parentId: '1550384448476807168',
        sortValue: 1,
        echoMap: {
          basicAttributeId: '数学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375577318326272'
      },
      {
        id: '1550384943467593728',
        createTime: '2022-07-22 15:39:09',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:09',
        updatedBy: '2',
        label: '英语',
        parentId: '1550384448476807168',
        sortValue: 2,
        echoMap: {
          basicAttributeId: '英语'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375603650166784'
      },
      {
        id: '1550384943467593729',
        createTime: '2022-07-22 15:39:09',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:09',
        updatedBy: '2',
        label: '科学',
        parentId: '1550384448476807168',
        sortValue: 3,
        echoMap: {
          basicAttributeId: '科学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375652169875456'
      },
      {
        id: '1550384943471788032',
        createTime: '2022-07-22 15:39:09',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:09',
        updatedBy: '2',
        label: '道德与法治',
        parentId: '1550384448476807168',
        sortValue: 4,
        echoMap: {
          basicAttributeId: '道德与法治'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375677381836800'
      }
    ],
    echoMap: {
      basicAttributeId: '五年级'
    },
    type: {
      code: 'GRADE',
      desc: '年级'
    },
    basicAttributeId: '8'
  },
  {
    id: '1550384448481001472',
    createTime: '2022-07-22 15:37:11',
    createdBy: '2',
    updateTime: '2022-07-22 15:37:11',
    updatedBy: '2',
    label: '六年级',
    parentId: '1550384146247843840',
    sortValue: 5,
    children: [
      {
        id: '1550384959271731200',
        createTime: '2022-07-22 15:39:13',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:13',
        updatedBy: '2',
        label: '语文',
        parentId: '1550384448481001472',
        sortValue: 0,
        echoMap: {
          basicAttributeId: '语文'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375539716390912'
      },
      {
        id: '1550384959275925504',
        createTime: '2022-07-22 15:39:13',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:13',
        updatedBy: '2',
        label: '数学',
        parentId: '1550384448481001472',
        sortValue: 1,
        echoMap: {
          basicAttributeId: '数学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375577318326272'
      },
      {
        id: '1550384959280119808',
        createTime: '2022-07-22 15:39:13',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:13',
        updatedBy: '2',
        label: '英语',
        parentId: '1550384448481001472',
        sortValue: 2,
        echoMap: {
          basicAttributeId: '英语'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375603650166784'
      },
      {
        id: '1550384959284314112',
        createTime: '2022-07-22 15:39:13',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:13',
        updatedBy: '2',
        label: '科学',
        parentId: '1550384448481001472',
        sortValue: 3,
        echoMap: {
          basicAttributeId: '科学'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375652169875456'
      },
      {
        id: '1550384959288508416',
        createTime: '2022-07-22 15:39:13',
        createdBy: '2',
        updateTime: '2022-07-22 15:39:13',
        updatedBy: '2',
        label: '道德与法治',
        parentId: '1550384448481001472',
        sortValue: 4,
        echoMap: {
          basicAttributeId: '道德与法治'
        },
        type: {
          code: 'SUBJECT',
          desc: '学科'
        },
        basicAttributeId: '1550375677381836800'
      }
    ],
    echoMap: {
      basicAttributeId: '六年级'
    },
    type: {
      code: 'GRADE',
      desc: '年级'
    },
    basicAttributeId: '9'
  }
]
</script>

<template>
  <div>
    {{ value }}
    <div style="width: 600px; height: 300px">
      <tree-transfer
        v-model="value"
        :data="data"
        show-filter
        :button-trigger="false"
      ></tree-transfer>
    </div>
  </div>
</template>
