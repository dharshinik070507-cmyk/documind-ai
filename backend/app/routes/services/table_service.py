import pdfplumber
from typing import List, Dict, Any


def is_valid_header_value(value: str) -> bool:
    value = value.strip().lower()
    invalid_values = {"", "unknown", "none", "null"}
    return value not in invalid_values


def extract_tables_from_pdf(pdf_path: str) -> List[Dict[str, Any]]:
    tables_output = []

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            tables = page.extract_tables()

            for idx, table in enumerate(tables, start=1):
                if not table or len(table) < 2:
                    continue

                raw_headers = table[0]
                raw_rows = table[1:]

                headers = []
                for i, h in enumerate(raw_headers):
                    if h is None or not str(h).strip():
                        headers.append(f"column_{i+1}")
                    else:
                        headers.append(str(h).strip())

                meaningful_headers = [h for h in headers if is_valid_header_value(h)]
                if len(meaningful_headers) < 2:
                    continue

                formatted_rows = []
                for row in raw_rows:
                    if not row:
                        continue

                    row_dict = {}
                    non_empty_cells = 0

                    for i, header in enumerate(headers):
                        cell = row[i] if i < len(row) else ""
                        cell_value = "" if cell is None else str(cell).strip()
                        row_dict[header] = cell_value

                        if cell_value:
                            non_empty_cells += 1

                    if non_empty_cells >= 2:
                        formatted_rows.append(row_dict)

                if len(formatted_rows) == 0:
                    continue

                tables_output.append({
                    "page": page_num,
                    "table_index": idx,
                    "headers": headers,
                    "rows": formatted_rows
                })

    return tables_output