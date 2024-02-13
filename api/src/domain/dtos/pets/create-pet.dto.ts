import { ILocation } from "../../interfaces/location.interface";

// Interface defining the structure of the pet data required to create a new pet.
interface IcreatePetDto {
  ownerId: number;
  name: string;
  speciesId: number;
  color: string;
  img: string;
  missingAt: Date;
}

/**
 * Class representing the data transfer object for creating a new pet.
 * This class includes all necessary fields to create a pet and utilizes a static factory method for instantiation.
 */
export class CreatePetDto {
  public ownerId: number;
  public name: string;
  public speciesId: number;
  public color: string;
  public img: string;
  public missingAt: Date;


  /**
     * Private constructor to initialize the CreatePetDto instance.
     * @param petData Object containing all the necessary data to create a pet.
     */
  private constructor(petData: IcreatePetDto) {
    const { ownerId, name, speciesId, color, img, missingAt } = petData;

    this.ownerId = ownerId;
    this.name = name;
    this.speciesId = speciesId;
    this.color = color;
    this.img = img;
    this.missingAt = missingAt;
  }

  /**
     * Static factory method to create a new CreatePetDto instance with validation.
     * Validates the input data and returns an error message if validation fails,
     * or a new instance of CreatePetDto if validation is successful.
     * @param object Object containing data to create a new pet.
     * @returns A tuple containing an error message (if any) and an instance of CreatePetDto.
     */
  static create(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const {
      ownerId,
      name,
      speciesId,
      color,
      img,
      missingAt,
    } = object;

    if ( !ownerId ) return ["Missing ownerId"];
    if ( !name ) return ["Missing name"];
    if ( !speciesId ) return ["Missing species"];
    if ( !color ) return ["Missing color"];
    if ( !img) return ["Missing img"];
    if ( !missingAt ) return ["Missing missingAt"];
  
    
    return [
      undefined,
      new CreatePetDto({
        ownerId,
        name,
        speciesId,
        color,
        img,
        missingAt,
      }),
    ];
  }
}
