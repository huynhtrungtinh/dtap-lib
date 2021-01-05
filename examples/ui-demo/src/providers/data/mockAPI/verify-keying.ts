export function getTask() {
    return {
        "id": "21936945-fbe6-11ea-88c1-b42e990954b6",
        "name": "Verify OMR",
        "assignee": "tinhht",
        "created": "2020-09-21T15:40:41.258+0700",
        "due": null,
        "followUp": null,
        "delegationState": null,
        "description": null,
        "executionId": "2192ccfc-fbe6-11ea-88c1-b42e990954b6",
        "owner": null,
        "parentTaskId": null,
        "priority": 50,
        "processDefinitionId": "d6d38972-fbae-11ea-88c1-b42e990954b6",
        "processInstanceId": "e8b47893-f99b-11ea-88c1-b42e990954b6",
        "taskDefinitionKey": "Verify_OMR",
        "caseExecutionId": null,
        "caseInstanceId": null,
        "caseDefinitionId": null,
        "suspended": false,
        "formKey": null,
        "tenantId": "5ee1cb9ec5c2440014ecba36",
        "variables": [
            {
                "type": "Object",
                "value": {
                    "doc_name": "APPL001234567",
                    "doc_uri": [
                        "/mnt/x-storage/Projects_SIT/147_191004_343_TPFICO_Data_Entry/Import/18092020/5f648f84d526040014fb9318/omr.jpg"
                    ],
                    "layout_name": "ACCA_Form",
                    "classify": [
                        {
                            "classifyer": "auto service",
                            "layout_name": "ACCA_Form"
                        }
                    ],
                    "batch_priority": "1",
                    "s2_url": [
                        "https://s3.digi-texx.vn/view/11qTo8GKiGwDu8JoIGYzjGagJMptG6hbfchMs79E8q%2FXoD8hsLlOUIM6OFNvULZfDZPeP53cGGfH4GmGYQKBF%2BFzHBfWl8srQO18FFqp8AmRWa1mHzn6Vml5OOkhry5BX%2FCkj9iob8GXY%2BMfeAgwvQ%3D%3D"
                    ],
                    "ocr_url": {
                        "docs_ocr_uri": [
                            "/mnt/x-storage/Projects_SIT/147_191004_343_TPFICO_Data_Entry/Import/18092020/5f648f84d526040014fb9318/omr.ocr.json"
                        ],
                        "docs_extract_uri": [
                            "/mnt/x-storage/Projects_SIT/147_191004_343_TPFICO_Data_Entry/Import/18092020/5f648f84d526040014fb9318/omr.ocr.extract.json"
                        ],
                        "s3_docs_ocr_uri": [
                            "https://s3.digi-texx.vn/view/xwJVjVcOxtDdcYQGehJgqHoLlTGf6a8pq12gLPTHyn9yr8Ub9NZPz46HX6P9PR4Fuquhs%2BywV8Br%2Fqu7ufXOUj6vRBlIyvTLC8uNrAXo8%2F7HRApIqw1PHVcnakybsuXcjlQN2vMW%2Fin40mL7O7Njyoqs0i4%3D"
                        ],
                        "s3_docs_extract_uri": [
                            "https://s3.digi-texx.vn/view/PyqcUYoEThWYsfBdCYlXMBIL2sM3FFXOMec%2BK1gAJwob9qYVbRG42skWjboFvYQGfZI6IrOjH%2Bui0FjW2SWxm%2FvfVFwlsdHlBtrrU1NIwcJYYYdV3IOIFJc996Rim499rA4uTzY5Vu3hSoU9z1d3tmIsVa8IPeX%2BeqEFsg%3D%3D"
                        ]
                    },
                    "doc_set_id": "5f648fb9ffd868001007dba7",
                    "batch_id": "5f6482e5ffd868001007db51",
                    "batch_name": "APPL001234567",
                    "records": [],
                    "id": "5f648fb9ffd868001007dba8"
                },
                "valueInfo": {
                    "objectTypeName": "java.util.LinkedHashMap",
                    "serializationDataFormat": "application/x-java-serialized-object"
                },
                "id": "2193422f-fbe6-11ea-88c1-b42e990954b6",
                "name": "input_data",
                "processInstanceId": "e8b47893-f99b-11ea-88c1-b42e990954b6",
                "executionId": "2192ccfc-fbe6-11ea-88c1-b42e990954b6",
                "caseInstanceId": null,
                "caseExecutionId": null,
                "taskId": null,
                "activityInstanceId": "Verify_OMR:2192ccfd-fbe6-11ea-88c1-b42e990954b6",
                "errorMessage": null,
                "tenantId": "5ee1cb9ec5c2440014ecba36"
            },
            {
                "type": "String",
                "value": "verify/5ee1cb9ec5c2440014ecba36/OMR2/Verify_OMR",
                "valueInfo": {},
                "id": "21934230-fbe6-11ea-88c1-b42e990954b6",
                "name": "form_uri",
                "processInstanceId": "e8b47893-f99b-11ea-88c1-b42e990954b6",
                "executionId": "2192ccfc-fbe6-11ea-88c1-b42e990954b6",
                "caseInstanceId": null,
                "caseExecutionId": null,
                "taskId": null,
                "activityInstanceId": "Verify_OMR:2192ccfd-fbe6-11ea-88c1-b42e990954b6",
                "errorMessage": null,
                "tenantId": "5ee1cb9ec5c2440014ecba36"
            },
            {
                "type": "Object",
                "value": {
                    "Bad": "title:Bad Task,comment:true",
                    "Hold": "title:Hold Task,comment:true"
                },
                "valueInfo": {
                    "objectTypeName": "java.util.TreeMap",
                    "serializationDataFormat": "application/x-java-serialized-object"
                },
                "id": "21934232-fbe6-11ea-88c1-b42e990954b6",
                "name": "complete_option",
                "processInstanceId": "e8b47893-f99b-11ea-88c1-b42e990954b6",
                "executionId": "2192ccfc-fbe6-11ea-88c1-b42e990954b6",
                "caseInstanceId": null,
                "caseExecutionId": null,
                "taskId": null,
                "activityInstanceId": "Verify_OMR:2192ccfd-fbe6-11ea-88c1-b42e990954b6",
                "errorMessage": null,
                "tenantId": "5ee1cb9ec5c2440014ecba36"
            },
            {
                "type": "Object",
                "value": [
                    [
                        {
                            "section": "OMR",
                            "data": [
                                {
                                    "A05": {
                                        "text": "Nữ",
                                        "words": [],
                                        "confidence": -1,
                                        "verify_data": [
                                            {
                                                "text": "Nữ",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "Nữ",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "verify_index": 0
                                    },
                                    "A08": {
                                        "text": "",
                                        "words": [],
                                        "confidence": -1,
                                        "verify_data": [
                                            {
                                                "text": "Ly hôn/góa",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "Đã kết hôn",
                                                "user": "tinhht"
                                            }
                                        ]
                                    },
                                    "A09": {
                                        "text": "",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "Khác",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "Trung học cơ sở",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": -1
                                    },
                                    "A72": {
                                        "text": "Family Book Address",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "Family Book Address",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "Family Book Address",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": 1,
                                        "verify_index": 0
                                    },
                                    "A82": {
                                        "text": "",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": 1,
                                        "verify_index": 0
                                    },
                                    "A84": {
                                        "text": "",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "Xây Dựng",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": -1
                                    },
                                    "A88": {
                                        "text": "Chuyên Viên",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "Chuyên Viên",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "Chuyên Viên",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": 1,
                                        "verify_index": 0
                                    },
                                    "A96": {
                                        "text": "",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "Thanh toán điện tử",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": -1
                                    },
                                    "D04": {
                                        "text": "",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "Từ chủ thuê",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": -1
                                    },
                                    "D08": {
                                        "text": "",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "Hàng hóa điện tử",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": -1
                                    },
                                    "L09": {
                                        "text": "",
                                        "words": [],
                                        "verify_data": [
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            },
                                            {
                                                "text": "",
                                                "user": "tinhht"
                                            }
                                        ],
                                        "confidence": 1,
                                        "verify_index": 0
                                    }
                                }
                            ]
                        }
                    ]
                ],
                "valueInfo": {
                    "objectTypeName": "java.util.ArrayList",
                    "serializationDataFormat": "application/x-java-serialized-object"
                },
                "id": "21936944-fbe6-11ea-88c1-b42e990954b6",
                "name": "key_data",
                "processInstanceId": "e8b47893-f99b-11ea-88c1-b42e990954b6",
                "executionId": "2192ccfc-fbe6-11ea-88c1-b42e990954b6",
                "caseInstanceId": null,
                "caseExecutionId": null,
                "taskId": null,
                "activityInstanceId": "Verify_OMR:2192ccfd-fbe6-11ea-88c1-b42e990954b6",
                "errorMessage": null,
                "tenantId": "5ee1cb9ec5c2440014ecba36"
            }
        ]
    }
}