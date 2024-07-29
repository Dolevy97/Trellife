export function createBoardPrompt(projectSubject) {

    const createBoardPrompt = `{
  "_id": "tAU12kL",
  "title": "Trip to Australia",
  "isStarred": false,
  "archivedAt": null,
  "createdBy": {
    "_id": "aBc123d",
    "fullname": "Alex Smith",
    "imgUrl": "../../../src/assets/imgs/user-imgs/user-img4.jpg",
    "favorites": []
  },
  "style": {
    "background": "url(https://images.unsplash.com/photo-1560480613-94f16f4140d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D)"
  },
  "labels": [
    {"id": "l1AUS01", "title": "High", "color": "#f00"},
    {"id": "l1AUS02", "title": "Medium", "color": "#fa0"},
    {"id": "l1AUS03", "title": "Low", "color": "#0f0"}
  ],
  "members": [
    {"_id": "m1AUS01", "fullname": "Emily", "imgUrl": "../../../src/assets/imgs/user-imgs/user-img1.jpg"},
    {"_id": "m1AUS02", "fullname": "Michael", "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"}
  ],
  "groups": [
    {
      "id": "gAUS01",
      "title": "Planning",
      "tasks": [
        {
          "id": "tAUS01",
          "title": "Book Flights",
          "isDone": false,
          "priority": "High",
          "checklists": [
            {
              "id": "clAUS01",
              "title": "Checklist",
              "todos": [
                {"id": "tdAUS01", "title": "Compare prices", "isDone": false},
                {"id": "tdAUS02", "title": "Choose airlines", "isDone": false}
              ]
            }
          ],
          "membersIds": ["m1AUS01"],
          "labelsIds": ["l1AUS01"],
          "byMember": {"_id": "aBc123d", "fullname": "Alex", "imgUrl": "../../../src/assets/imgs/user-imgs/user-img4.jpg"}
        }
      ],
      "style": {"backgroundColor": "#206a83"}
    },
    {
      "id": "gAUS02",
      "title": "Packing",
      "tasks": [
        {
          "id": "tAUS02",
          "title": "Create Packing List",
          "isDone": false,
          "priority": "Low",
          "checklists": [
            {
              "id": "clAUS02",
              "title": "Checklist",
              "todos": [
                {"id": "tdAUS03", "title": "List items", "isDone": false},
                {"id": "tdAUS04", "title": "Buy accessories", "isDone": false}
              ]
            }
          ],
          "membersIds": ["m1AUS01"],
          "labelsIds": ["l1AUS03"],
          "byMember": {"_id": "m1AUS02", "fullname": "Michael", "imgUrl": "../../../src/assets/imgs/user-imgs/user-img2.jpg"}
        }
      ],
      "style": {"backgroundColor": "#206a83"}
    }
  ]
} ,
    according to this format create a json of a new board,
     with the following requirement:
     i want you to create a board json of ${projectSubject} project .`
    //  2. create 3 groups,
    //  each one has a title that describes all the tasks under it.
    //  3. each group should have an array of 3 tasks minimum.
    // 4.make sure you return just the json object 
    // 5.in each task.style.backgroundColor give me some color for example "#4bce97" dont put caluculations inside the value of the field. each task.style.backgroundColor should have a different color or an empty string. 
    // 6. in the board.style.backgroung put this: 'https: //res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg' 
    // 7. each task should have 1 checklist with minimum 2 todos inside.`

    return createBoardPrompt
}
