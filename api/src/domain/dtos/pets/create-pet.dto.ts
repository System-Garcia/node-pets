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
    let {
      ownerId,
      name,
      speciesId,
      color,
      img,
      missingAt,
    } = object;

    if ( !ownerId ) return ["Missing ownerId"];
    if ( isNaN(ownerId) ) return ["OwnerId must be a number"];
    ownerId = parseInt(ownerId);

    if ( !name ) return ["Missing name"];
    if ( typeof name !== 'string') return ["Name must be a string"];
    if ( name.trim().length === 0 ) return ["Name cannot be empty"];
    if ( name.trim().length > 50 ) return ["Name cannot be longer than 50 characters"];
    name = name.trim().toLowerCase();

    if ( !speciesId ) return ["Missing species"];
    if ( isNaN(speciesId) ) return ["Species must be a number"];
    speciesId = parseInt(speciesId);

    if ( !color ) return ["Missing color"];
    if ( typeof color !== 'string') return ["Color must be a string"];
    if ( color.trim().length === 0 ) return ["Color cannot be empty"];
    if ( color.trim().length > 50 ) return ["Color cannot be longer than 50 characters"];
    color = color.trim().toLowerCase();

    if ( !img) return ["Missing img"];
    if ( typeof img !== 'string') return ["Img must be a string"];

    if ( !missingAt ) return ["Missing missingAt"];

    let newMissingAt = new Date(missingAt);

    if (isNaN(newMissingAt.getTime())) {
      return ["missingAt must be a valid Date"];
    }
  
    
    return [
      undefined,
      new CreatePetDto({
        ownerId,
        name,
        speciesId,
        color,
        img,
        missingAt: newMissingAt,
      }),
    ];
  }
}
