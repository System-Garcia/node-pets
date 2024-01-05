
interface IcreatePetDt {
  ownerId: number;
  name: string;
  speciesId: number;
  age: number;
  color: string;
  img: string;
  missingAt: Date;
  locationId: number;
}

export class CreatePetDto {
  public ownerId: number;
  public name: string;
  public speciesId: number;
  public age: number;
  public color: string;
  public img: string;
  public missingAt: Date;
  public locationId: number;

  private constructor(petData: IcreatePetDt) {
    const { ownerId, name, speciesId, age, color, img, missingAt, locationId } = petData;

    this.ownerId = ownerId;
    this.name = name;
    this.age = age;
    this.speciesId = speciesId;
    this.color = color;
    this.img = img;
    this.locationId = locationId;
    this.missingAt = missingAt;
  }

  static create(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { ownerId, name, speciesId, age, color, img, missingAt, locationId } = object;

    if (!ownerId) return ["Missing ownerId"];
    if (!name) return ["Missing name"];
    if (!speciesId) return ["Missing species"];
    if (!age) return ["Missing age"];
    if (!color) return ["Missing color"];
    if (!img) return ["Missing img"];
    if (!missingAt) return ["Missing missingAt"];
    if (!locationId) return ["Missing locationId"]; // Todo: mejorar la logica de location

    return [
      undefined,
      new CreatePetDto({
        ownerId,
        name,
        speciesId,
        age,
        color,
        img,
        missingAt,
        locationId,
      }),
    ];
  }
}
