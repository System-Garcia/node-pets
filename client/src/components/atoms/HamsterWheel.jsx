import styles from "../../styles/pages/atoms/hamsterWheel.module.css";

export const HamsterWheel = () => {
  return (
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheelAndHamster">
        <div class="wheel"></div>
        <div class="hamster">
            <div class="hamsterBody">
                <div class="hamsterHead">
                    <div class="hamsterEar"></div>
                    <div class="hamsterEye"></div>
                    <div class="hamsterNose"></div>
                </div>
                <div class="hamsterLimb hamsterLimbFr"></div>
                <div class="hamsterLimb hamsterLimbFl"></div>
                <div class="hamsterLimb hamsterLimbBr"></div>
                <div class="hamsterLimb hamsterLimbBl"></div>
                <div class="hamsterTail"></div>
            </div>
        </div>
        <div class="spoke"></div>
    </div>
  )
}
