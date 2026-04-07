import pdfplumber
from typing import List, Dict, Any


def extract_tables_from_pdf(pdf_path: str) -> List[Dict[str, Any]]:
    tables_output = []

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            tables = page.extract_tables()

            for idx, table in enumerate(tables, start=1):
                if not table:
                    continue

                headers = table[0] if len(table) > 0 else []
                rows = table[1:] if len(table) > 1 else []

                formatted_rows = []
                for row in rows:
                    row_dict = {}
                    for h, cell in zip(headers, row):
                        key = h if h else "unknown"
                        row_dict[key] = cell
                    formatted_rows.append(row_dict)

                tables_output.append({
                    "page": page_num,
                    "table_index": idx,
                    "headers": headers,
                    "rows": formatted_rows
                })

    return tables_output
