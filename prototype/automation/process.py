import io
import os

def replace_token(line: str, token: str, replacement: str):
    if token in line:
        return (line.replace(token, replacement), True)
    return (line, False)

lines = []
with io.open("input.css", "r", encoding="utf-8") as file:
    lines = file.readlines()

writer = io.open(os.path.join(os.path.dirname(__file__), "../styles/overrides.css"), "w", encoding="utf-8")
selector = None

for line in lines:
    line = line.strip()

    if line.endswith("{"):
        selector = line[:-1].strip()
    if line.endswith("}"):
        selector = None
    else:
        if selector:
            line, success_a = replace_token(line, "#313543", "transparent") # background
            line, success_b = replace_token(line, "#282c37", "transparent")
            line, success_c = replace_token(line, "#17191f", "transparent")
            line, success_d = replace_token(line, "#595aff", "#1d9bf0") # Publish Button
            line, success_e = replace_token(line, "#8c8dff", "#1d9bf0") # links
            line, success_f = replace_token(line, "#606984", "#fff") # attachements
            line, success_g = replace_token(line, "#606984", "#71767b") # sublinks
            #
            if success_a or success_b or success_c or success_d or success_e:
                if line.endswith(";"):
                    line = line.replace(";", " !important;")
                else:
                    line = line + " !important;"
                writer.write(selector + "{" + line + "}" + "\n")
            
            if "#121212" in line:
                print(line)

writer.close()
