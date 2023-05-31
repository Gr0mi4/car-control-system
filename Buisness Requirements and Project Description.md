Car Control System

Main task: Gather all data need for car enthusiast in one place in as handy was as possible.

What data can car enthusiast need?

1. Photos of the car and process of working on it (and video) aka Gallery - v1
2. Journal where enthusiast can describe process, thoughts, plans and etc - v1
3. Reference documents available - instructions and etc - v1.5
4. Shopping list - what does he need to buy, or what he actually bought, how much it costs did it fit and etc v2
5. Calendar - to add some events, breaks, remember when would be new repair or maintence - v3

MVP Requirements:

- Ability to Log in/Log out - Ok
- Ability to Add/Remove Vehicles - ok
- Ability to Add Notes, with date - ok
- Ability to change Fields - ok
- Ability to add/change/remove custom fields - ok
- Ability to add several photos - ok

  Basically in first version we are adding First two points of main requirements, we have
  your vehicle, photos and notes, that can be (potentially filtered in chronological order). So some base of the
  calendar
  is ready.

V 1.5 Requiremnts:

- Photo Crop for avatar (Add spinner while loading)
- Notes improve (Dates, money spend, smth else)

Screens description

Main Screen: Place where you are can select vehicle, that you'll be working with, add new one, delete it.

Add Vehicle Modal: Place where you are adding new vehicle. Input fields:

- Type (required, Select). Values: Car, Motorcycle, Bicycle, Other.
- Brand (Input, can be Select in future).
- Model (Same as Brand)
- Modification
- Nickname
- Model Year
- Owned From
- Active (Radio). Values: Yes/No
- Image

VehicleItem Screen: Screen where you can have a look on a Vehicle's details, add details fields, and Notes.

Capitan's Journal. Place where you can create notes, add there photos, links and stuff.

Photos handling. On upload icon click you will just get windows upload window, and by clicking save, you will
see a gallery with ability to check results, resize photos, change names and deleted ones that you do no like.
All photos would be stored in one array, you will select witch would be main in edit modal. By default it would be
first one.
