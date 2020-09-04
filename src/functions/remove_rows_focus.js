export const remove_rows_focus = (rows) =>
    rows.map((row) => {
        row.has_focus = false;
        return row;
    });
