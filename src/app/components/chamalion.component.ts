import { HttpClient } from '@angular/common/http';
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
  editorInstance: any;
  imgData = imgData;
  galleryVisible = false;
  apiKey = 'h2dmDYW2gSS3rDgxb8bO';
  html: any;
  json = true;
  emailDocument = JSON.parse(emailData);
  blockLibraryData = new Map();

  constructor(
    @Inject(API) readonly chamaileonSdk: chamaileonSdk,
    private accessToken: AccessToken,
    private http: HttpClient
  ) {
    this.accessToken
      .getAccessToken()
      .pipe(mergeMap((token) => this.initChamaileonSDK(token)))
      .subscribe((data) => {
        console.log(data);

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

  async openEditor() {
    const config = this.getEditorConfig();

    this.editorInstance = await this.objectSDK.editEmail(config);
  }

  requestEmailHtml() {
    return this.http.post(
      'https://sdk-api.chamaileon.io/api/v1/emails/generate',
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: this.emailDocument,
        }),
      }
    );
  }

  getEmailHtml() {
    this.requestEmailHtml().subscribe((d) => {
      console.log(d);
    });
  }

  private getGalleryConfig() {
    const galleryConfig = {
      settings: {
        folderTree: {
          _id: 'root',
          name: 'root',
          children: [
            {
              _id: '16322284940689326',
              name: 'Favorite Images',
              children: [
                {
                  name: 'New Folder',
                  _id: '16481987747204388',
                },
              ],
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
          console.log('onUploadImage');
          return new Promise((resolve) => {
            resolve({
              _id: '231231',
              name: 'fox',
              src: image.data,
            });
          });
        },
        onFolderSelected: () => {
          console.log('onFolderSelected');
          return new Promise((resolve) => {
            resolve({
              images: imgData,
              count: imgData.length,
            });
          });
        },
        onSaveUrl: ({}) => {
          console.log('onSaveUrl');
          return new Promise((resolve) => {
            resolve({
              _id: 'sdsdsd',
              name: 'dasdwq',
              src: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/%D0%A3%D0%BF%D0%BE%D1%80%D0%BE%D1%82%D1%8B%D0%B9_%D0%BB%D0%B8%D1%81_1920x2560.jpg',
            });
          });
        },

        onUpdateImage: async ({
          imageId,
          parents,
          selectedFolderId,
          image,
        }) => {
          console.log('onUpdateImage');

          return image;
          // Update image
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
        blockLibraries: [
          {
            id: '1',
            label: 'library',
            canDeleteBlock: true,
            canRenameBlock: true,
            canSaveBlock: true,
          },
        ],
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
        onChange: () => {
          return new Promise((resolve) => {
            this.html = this.editorInstance.getEmailHtml();
            this.html.then((value: any) => {
              this.html = value;
            });
            resolve({});
          });
        },
        //@ts-ignore
        onEditImage: async () => {
          const gallery = await this.objectSDK.openGallery(
            this.getGalleryConfig()
          );
          const { url } = await gallery.pickImage();
          await gallery.close();
          return { src: url };
          //       const gal = await this.objectSDK.openGallery(this.getGalleryConfig());
          // const obj = await gal.pickImage();
          // console.log(obj);
        },

        //блоки
        // @ts-ignore
        onLoadBlocks: ({ libId }) => {
          let blocks: any[] = [];
          if (!this.blockLibraryData.has(libId)) {
            blocks = [];
          } else {
            blocks = this.blockLibraryData.get(libId);
          }
          return new Promise((resolve) => {
            resolve({ blocks });
          });
        },
        // @ts-ignore
        onBlockSave: ({ libId, block }) => {
          if (!this.blockLibraryData.has(libId)) {
            this.blockLibraryData.set(libId, []);
          }
          this.blockLibraryData.get(libId).push(block);
          console.log(block.title);
          return new Promise((resolve) => {
            resolve({ block });
          });
        },
      },
    };
    return editorConfig;
  }

  private getVariableEditorConfig(dataEmail: any) {
    const varEditorConfig = {
      document: { dataEmail },
      settings: {
        variablesToEdit: ['varName1', 'varName2'],
        buttons: {
          header: {
            left: [{id: 'test', icon: 'https://cdn-icons-png.flaticon.com/512/447/447057.png'}],
            right: [],
          },
          footer: {
            left: [],
            right: [],
          },
          textInsertPlugin: [],
        },
        hooks: {},
      },
    };
    return varEditorConfig;
  }
}
