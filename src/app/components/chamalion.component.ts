import { AccessToken } from './../state/access.token';
import { chamaileonSdk } from './../index.d';
import {
  Component,
  Input,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { API } from '../tokens';
import { from, mergeMap, Observable } from 'rxjs';
import { emailData, imgData } from '../state/img.data';

@Component({
  selector: 'sdk',
  templateUrl: './chamalion.component.html',
})
export class SDKComponent implements OnInit {
  chamaileonPlugins: Observable<object>;
  objectSDK: any;
  imgData = imgData;
  galleryVisible = false;

  emailDocument = JSON.parse(emailData);

  constructor(
    @Inject(API) readonly chamaileonSdk: chamaileonSdk,
    private accessToken: AccessToken
  ) {
    this.accessToken
      .getAccessToken()
      .pipe(mergeMap((token) => this.initChamaileonSDK(token)))
      .subscribe((data) => {
        this.objectSDK = data;
      });
  }

  ngOnInit() {}

  private initChamaileonSDK(token: string) {
    const chamaileonPlugins = this.chamaileonSdk.init({
      mode: 'serverless',
      accessToken: token,
      whitelabel: {
        locale: 'en',
        urls: {
          splashScreen:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/splashScreen.html',
          createLogoJS:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
        colors: {
          primary: '#2D3291',
          secondary: '#009f4a',
          red: '#ff5546',
          darkBlue: '#2d3291',
          darkGreen: '#00af6e',
          lightGreen: '#50d791',
          weirdGreen: '#50d791',
          pink: '#ff91a0',
          yellow: '#ffd23c',
        },
      },
    });
    return from(chamaileonPlugins);
  }

  openEditor() {
    const config = this.getEditorConfig();
    this.objectSDK.editEmail(config);
  }

  private getGalleryConfig() {
    const galleryConfig = {
      settings: {
        folderTree: {
          _id: 'root',
          name: 'Root folder',
          children: [
            {
              id: '31231311',
              name: 'Greate image',
            },
          ],
        },
        selectedFolderId: 'root',
        maxImagePerPage: 12,
        maxFileSize: 5,
      },
      hooks: {
        // @ts-ignore
        onUploadImage: ({ selectedFolderId, parents, image }) => {
          console.log(image);

          return new Promise((resolve) => {
            resolve({
              _id: '231231',
              name: 'fox',
              src: image.data,
            });
          });
        },
        onFolderSelected: () => {
          return new Promise((resolve) => {
            resolve({
              images: imgData,
              count: imgData.length,
            });
          });
        },
        onSaveUrl: ({}) => {
          return new Promise((resolve) => {
            resolve({
              _id: 'sdsdsd',
              name: 'dasdwq',
              src: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/%D0%A3%D0%BF%D0%BE%D1%80%D0%BE%D1%82%D1%8B%D0%B9_%D0%BB%D0%B8%D1%81_1920x2560.jpg',
            });
          });
        },
      },
    };
    return galleryConfig;
  }

  private getEditorConfig() {
    const editorConfig = {
      document: this.emailDocument, // a JSON object that represents the email document
      user: {
        // or false to turn off the user avatar
        id: '5c6bfaba1f848b135dc46c41', // Id of the current user
        name: 'John Doe', // the display name of your user
        avatar:
          'https://n1s2.starhit.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/445x460_0_6a5d57baf3fab914fdfcc2cc563ed893@480x496_0xac120003_4430520541578509619.jpg', // the avatar of your user
      },
      settings: {
        elements: {
          content: {
            text: true,
            image: true,
            button: true,
            divider: true,
            social: true,
            code: true,
            video: false,
          },
          structure: {
            fullWidth: false,
            box: true,
            multiColumn: true,
          },
          advanced: {
            loop: true,
            conditional: true,
            dynamicImage: true,
          },
        },
        blockLibraries: [],
        hideDefaultFonts: false, // if true, the default built-in font stacks are hidden, if false, the custom font stacks are added to the default ones.
        addons: {
          blockLock: {
            // or false to fully turn off (hide) the addon
            enabled: true, // enable / disable the addon
          },
          variableSystem: {
            // or false to fully turn off (hide) the addon
            enabled: true, // enable / disable the addon
          },
        },
        actionMenu: {
          // control of different action menus
          block: {
            // if false the Block Menu is turned off (floating menu right side each block)
            drag: true, // you can turn off each button individually
            save: true, // the save option automatically hidden when no blockLibraries added to the editor instance
            duplicate: true,
            delete: true,
          },
        },
        toolboxes: {
          body: true,
          fullWidth: true,
          text: true,
          button: true,
          box: true,
          multiColumn: true,
          image: true,
          divider: true,
          code: true,
          social: true,
          column: true,
          loop: true,
          conditional: true,
          dynamicImage: true,
          video: true,
          blockLevelConditional: true,
          blockLevelLoop: true,
        },
        dropzones: {
          block: true, // when false dropzones above and under blockes are turned off. No new element can be created by drag and drop, but inside each block
        },
      },
      hooks: {
        // @ts-ignore
        onSave: ({ document }) => {
          this.emailDocument = document;
          console.log(this.emailDocument);
          return new Promise<void>((resolve) => {
            resolve();
          });
        },
        onEditImage: async ({}) => {
          const { src } = await this.objectSDK.openGallery(
            this.getGalleryConfig()
          );
          return { src };
        },
        // onEditBackgroundImage:
      },
    };
    return editorConfig;
  }
}
