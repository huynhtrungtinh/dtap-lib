export function getFunctionsOperation() {
    return [
        // Operator
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_1o8qx7z",
            "display_name": "Waiting for Proof",
            "path": "assign/tasks/5d1465340fb92b0017a5621a/Task_1o8qx7z"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_0ym5ac7",
            "display_name": "Type",
            "path": "invoice/5d1465340fb92b0017a5621a/keying/Invoice/Task_0ym5ac7"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_18rrsvu",
            "display_name": "Proof",
            "path": "invoice/5d1465340fb92b0017a5621a/proof/Invoice/Task_18rrsvu"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_1qfw4tc",
            "display_name": "Verify Hold Proof",
            "path": "verifying/hold/10/true/5d1465340fb92b0017a5621a/Task_1qfw4tc"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_0rzw5ve",
            "display_name": "Verify Hold Type",
            "path": "verifying/hold/10/true/5d1465340fb92b0017a5621a/Task_0rzw5ve"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_0oa8o9e",
            "display_name": "Supervisor",
            "path": "invoice/5d1465340fb92b0017a5621a/supervisor/Invoice/Task_0oa8o9e"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_0fsh84b",
            "display_name": "Verify Hold Supervisor",
            "path": "verifying/hold/10/true/5d1465340fb92b0017a5621a/Task_0fsh84b"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_1v7ehsl",
            "display_name": "View Key Data",
            "path": "data/invoice/5d1465340fb92b0017a5621a/Task_1v7ehsl"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "production",
            "display_sub_app": "Operator",
            "type": "workflow",
            "path_prefix": "production",
            "name": "Task_08iat1i",
            "display_name": "Close and Rework Batch",
            "path": "rework/projects/5d1465340fb92b0017a5621a/Task_08iat1i/"
        },

        // QC Execution
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "quality-control",
            "display_sub_app": "QC Execution",
            "type": "workflow",
            "path_prefix": "quality-control",
            "name": "Task_1s4593u",
            "display_name": "QC Invoice Invoice",
            "path": "qc/5d1465340fb92b0017a5621a/5/Invoice/Invoice/Task_1s4593u"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "quality-control",
            "display_sub_app": "QC Execution",
            "type": "workflow",
            "path_prefix": "quality-control",
            "name": "Task_11gcu4r",
            "display_name": "QC Invoice Type",
            "path": "qc/5d1465340fb92b0017a5621a/5/Invoice/Type/Task_11gcu4r"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "quality-control",
            "display_sub_app": "QC Execution",
            "type": "workflow",
            "path_prefix": "quality-control",
            "name": "Task_06sz78q",
            "display_name": "QC Invoice Proof",
            "path": "qc/5d1465340fb92b0017a5621a/5/Invoice/Proof/Task_06sz78q"
        },
        {
            "root_app": "operator",
            "display_root_app": "Operator",
            "sub_app": "quality-control",
            "display_sub_app": "QC Execution",
            "type": "workflow",
            "path_prefix": "quality-control",
            "name": "Task_1myjfvk",
            "display_name": "QC Invoice Supervisor",
            "path": "qc/5d1465340fb92b0017a5621a/5/Invoice/Supervisor/Task_1myjfvk"
        },

        // Prd Management
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "acquisitions",
            "display_name": "Acquisitions",
            "path": "projects/:projectId/acquisitions"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "tasks-assignment",
            "display_name": "Tasks assignment",
            "path": "projects/:projectId/tasks-assignment"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "functions-assignment",
            "display_name": "Functions assignment",
            "path": "projects/:projectId/functions-assignment"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "approve-qc",
            "display_name": "Approve QC",
            "path": "projects/:projectId/approve-qc"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "batch-information",
            "display_name": "Batch information",
            "path": "projects/:projectId/batch-information"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "batch-priority",
            "display_name": "Batch Priority",
            "path": "projects/:projectId/batch-priority"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "document-information",
            "display_name": "Document information",
            "path": "projects/:projectId/document-information"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "export-data",
            "display_name": "Export data",
            "path": "projects/:projectId/export-data"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "manual-upload",
            "display_name": "Manual Upload",
            "path": "projects/:projectId/manual-upload"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "project-announcement",
            "display_name": "Project Announcement",
            "path": "projects/:projectId/project-announcement"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "project-guide",
            "display_name": "Project Guide",
            "path": "projects/:projectId/project-guide"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "rework-details",
            "display_name": "Rework Details",
            "path": "projects/:projectId/rework-details"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "training-configs",
            "display_name": "Training configs",
            "path": "projects/:projectId/training-configs"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "training-report",
            "display_name": "Training Report",
            "path": "projects/:projectId/training-report"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "verifying-configuration",
            "display_name": "Verifying Configuration",
            "path": "projects/:projectId/verifying-configuration"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "monitor-citi",
            "display_name": "Monitor Citi",
            "path": "projects/:projectId/monitor-citi"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "production-admin",
            "display_sub_app": "Prd Management",
            "type": null,
            "path_prefix": "production-admin",
            "name": "view-data-entry",
            "display_name": "View Data Entry",
            "path": "projects/:projectId/view-data-entry"
        },

        // qc-admin
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "qc-admin",
            "display_sub_app": "QC Management",
            "type": null,
            "path_prefix": "qc-admin",
            "name": "tasks-assignment-qc",
            "display_name": "Tasks assignment",
            "path": "projects/:projectId/tasks-assignment-qc"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "qc-admin",
            "display_sub_app": "QC Management",
            "type": null,
            "path_prefix": "qc-admin",
            "name": "functions-assignment-qc",
            "display_name": "Functions assignment",
            "path": "projects/:projectId/functions-assignment-qc"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "qc-admin",
            "display_sub_app": "QC Management",
            "type": null,
            "path_prefix": "qc-admin",
            "name": "qc-setting",
            "display_name": "QC Setting",
            "path": "projects/:projectId/qc-setting"
        },
        {
            "root_app": "manager",
            "display_root_app": "Manager",
            "sub_app": "qc-admin",
            "display_sub_app": "QC Management",
            "type": null,
            "path_prefix": "qc-admin",
            "name": "qc-sampling",
            "display_name": "QC Sampling",
            "path": "projects/:projectId/qc-sampling"
        },

        // monitoring
        {

            "root_app": "monitoring",
            "display_root_app": "Monitoring",
            "type": null,
            "path_prefix": "reports",
            "name": "monitor-operator",
            "display_name": "Monitor Operator",
            "path": "projects/:projectId/monitor-operator"
        },

        // reporting
        {
            "root_app": "reporting",
            "display_root_app": "Reporting",
            "type": null,
            "path_prefix": "reports",
            "name": "details-mistake-report",
            "display_name": "Details Mistake Report",
            "path": "projects/:projectId/details-mistake-report"
        },
        {
            "root_app": "reporting",
            "display_root_app": "Reporting",
            "type": null,
            "path_prefix": "reports",
            "name": "performance-report",
            "display_name": "Performance Report",
            "path": "projects/:projectId/performance-report"
        },
    ]
}
// 5d1465340fb92b0017a5621a
// 040_DEMO_DGS03
