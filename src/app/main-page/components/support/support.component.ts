import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * obsługuje zmianę kierunku strzałki przy pytaniu
   * @param event zdarzenie kliknięcia
   */
  toggleQuestionArrow(event: Event): void {
    let clickedElement: Element = (event.target as Element);

    if (clickedElement.classList.contains('fa-arrow-up')) {
      this.resetOtherArrowsDirectionToUp(clickedElement.id);
      this.toggleArrowIcon(clickedElement.id);
    } else {

      const children: Element[] = Array.from(clickedElement.children);
      children.forEach(child => {
        if (child.classList.contains('fa-arrow-up')) {
          this.resetOtherArrowsDirectionToUp(child.id);
          this.toggleArrowIcon(child.id);
        }
      });
    }
  }

  /**
   * @description funckja odpowiada za ustawienie kierunku strzałek do góry oprócz ikony
   * z podanym id jako argument wejściowy
   * @param arrowIdToOmit id ikony, która ma być pominęta w zmianie kierunku
   */
  resetOtherArrowsDirectionToUp(arrowIdToOmit: string): void {
    const foundIcons: Element[] = Array.from(document.getElementsByClassName('fa-arrow-up'));
    if (foundIcons && foundIcons.length > 0) {
      foundIcons.filter( icon => icon.id !== arrowIdToOmit ).forEach(foundIcon => {
        const iconId = foundIcon.id;
        this.changeArrowIconDirection(iconId, true);
      });
    }
  }

  /**
   * odpowiada za zmianę kierunku ikony strzałki rzy pytaniu
   * @param elementId id ikony
   */
  toggleArrowIcon(elementId: string): void {
    const arrowIcon: HTMLElement = document.getElementById(elementId);

    if (arrowIcon) {
      if (arrowIcon.classList.contains('rotate-question-arrow-show')){
        this.changeArrowIconDirection(arrowIcon.id, true);
      } else {
        this.changeArrowIconDirection(arrowIcon.id, false);
      }
    }
  }

  changeArrowIconDirection(elementId: string, directToUp: boolean) {
    const element: HTMLElement = document.getElementById(elementId);
    if (element) {
      if (directToUp) {
        element.classList.remove('rotate-question-arrow-show');
        element.classList.add('rotate-question-arrow-hide');
      } else {
        element.classList.remove('rotate-question-arrow-hide');
        element.classList.add('rotate-question-arrow-show');
      }
    }
  }
}
