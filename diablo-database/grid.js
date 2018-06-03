$(document).ready(function() {
    $('#example').DataTable({
        "ajax": "grid_uniques.json",
        "columns": [
            {"data":"id"},
            {"data":"uniqueName" },
            {"data":"uniqueModifiers" }
        ],
        mark: true,
    } )
} );