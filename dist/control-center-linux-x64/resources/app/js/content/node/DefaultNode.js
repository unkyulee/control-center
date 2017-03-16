
export const DefaultNode = {
  "id": "new_node",

  "title": "new node",
  "title_font_size": "15",
  "title_font_color": "black",
  "title_bg_color": "white",
  "title_align": "center",

  "description": "0.11",
  "description_font_size": "15",
  "description_font_color": "black",
  "description_bg_color": "green",
  "description_align": "center",

  "icon": "https://cdn2.iconfinder.com/data/icons/kitchen-appliances-computers-and-electronics/32/Appliances-01-128.png",
  "icon_height": "20",
  "icon_width": "20",

  "action": [
    {
      "name": "switch off",
      "timer": 0,
      "script": "alert('switch off')"
    },
    {
      "name": "switch on",
      "timer": 0,
      "script": "alert('switch on')"
    }
  ],

  "backgroundColor": "grey",
  "top": 10,
  "left": 10,
  "width": 150,
  "height": 80
}
