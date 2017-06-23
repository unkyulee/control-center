import json

# read "project_template.json"
with open("project_template.json") as f:
    j = json.loads(f.read())

# loop through all elements
for k, v in j['elements'].iteritems():
    # update heigh
    y = v['y'].replace('px', '')
    y = int(y) + 10
    v['y'] = "{}px".format(y)


# save back the json file
with open("project_template.conv", "w") as f:
    f.write(json.dumps(j, indent=2))
