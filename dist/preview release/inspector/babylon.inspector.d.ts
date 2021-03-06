/// <reference types="react" />
declare module INSPECTOR {
    export class PropertyChangedEvent {
        object: any;
        property: string;
        value: any;
        initialValue: any;
        allowNullValue?: boolean;
    }
}
declare module INSPECTOR {
    export class ReplayRecorder {
        private _sceneRecorder;
        private _isRecording;
        get isRecording(): boolean;
        cancel(): void;
        trackScene(scene: BABYLON.Scene): void;
        applyDelta(json: any, scene: BABYLON.Scene): void;
        export(): void;
    }
}
declare module INSPECTOR {
    export class GlobalState {
        onSelectionChangedObservable: BABYLON.Observable<any>;
        onPropertyChangedObservable: BABYLON.Observable<PropertyChangedEvent>;
        onInspectorClosedObservable: BABYLON.Observable<BABYLON.Scene>;
        onTabChangedObservable: BABYLON.Observable<number>;
        onSelectionRenamedObservable: BABYLON.Observable<void>;
        onPluginActivatedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync>>;
        onNewSceneObservable: BABYLON.Observable<BABYLON.Scene>;
        sceneImportDefaults: {
            [key: string]: any;
        };
        validationResults: BABYLON.Nullable<BABYLON.GLTF2.IGLTFValidationResults>;
        onValidationResultsUpdatedObservable: BABYLON.Observable<BABYLON.Nullable<BABYLON.GLTF2.IGLTFValidationResults>>;
        onExtensionLoadedObservable: BABYLON.Observable<import("babylonjs-loaders/glTF/index").IGLTFLoaderExtension>;
        glTFLoaderExtensionDefaults: {
            [name: string]: {
                [key: string]: any;
            };
        };
        glTFLoaderDefaults: {
            [key: string]: any;
        };
        glTFLoaderExtensions: {
            [key: string]: import("babylonjs-loaders/glTF/index").IGLTFLoaderExtension;
        };
        blockMutationUpdates: boolean;
        selectedLineContainerTitles: Array<string>;
        selectedLineContainerTitlesNoFocus: Array<string>;
        recorder: ReplayRecorder;
        private _onlyUseEulers;
        get onlyUseEulers(): boolean;
        set onlyUseEulers(value: boolean);
        private _ignoreBackfacesForPicking;
        get ignoreBackfacesForPicking(): boolean;
        set ignoreBackfacesForPicking(value: boolean);
        init(propertyChangedObservable: BABYLON.Observable<PropertyChangedEvent>): void;
        prepareGLTFPlugin(loader: import("babylonjs-loaders/glTF/index").GLTFFileLoader): void;
        resetGLTFValidationResults(): void;
        lightGizmos: Array<BABYLON.LightGizmo>;
        enableLightGizmo(light: BABYLON.Light, enable?: boolean): void;
        cameraGizmos: Array<BABYLON.CameraGizmo>;
        enableCameraGizmo(camera: BABYLON.Camera, enable?: boolean): void;
    }
}
declare module INSPECTOR {
    export interface IPaneComponentProps {
        title: string;
        scene: BABYLON.Scene;
        selectedEntity?: any;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        globalState: GlobalState;
    }
    export class PaneComponent extends React.Component<IPaneComponentProps, {
        tag: any;
    }> {
        constructor(props: IPaneComponentProps);
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    interface ITabsComponentProps {
        children: any[];
        selectedIndex: number;
        onSelectedIndexChange: (value: number) => void;
    }
    export class TabsComponent extends React.Component<ITabsComponentProps> {
        constructor(props: ITabsComponentProps);
        onSelect(index: number): void;
        renderLabel(child: PaneComponent, index: number): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITextLineComponentProps {
        label?: string;
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        ignoreValue?: boolean;
        additionalClass?: string;
    }
    export class TextLineComponent extends React.Component<ITextLineComponentProps> {
        constructor(props: ITextLineComponentProps);
        onLink(): void;
        renderContent(): JSX.Element | null;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ILineContainerComponentProps {
        globalState?: GlobalState;
        title: string;
        children: any[] | any;
        closed?: boolean;
    }
    export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
        isExpanded: boolean;
        isHighlighted: boolean;
    }> {
        constructor(props: ILineContainerComponentProps);
        switchExpandedState(): void;
        componentDidMount(): void;
        renderHeader(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IValueLineComponentProps {
        label: string;
        value: number;
        color?: string;
        fractionDigits?: number;
        units?: string;
    }
    export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
        constructor(props: IValueLineComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IBooleanLineComponentProps {
        label: string;
        value: boolean;
    }
    export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
        constructor(props: IBooleanLineComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export class StatisticsTabComponent extends PaneComponent {
        private _sceneInstrumentation;
        private _engineInstrumentation;
        private _timerIntervalId;
        constructor(props: IPaneComponentProps);
        componentWillUnmount(): void;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    export interface ICheckBoxLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        isSelected?: () => boolean;
        onSelect?: (value: boolean) => void;
        onValueChanged?: () => void;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
        isSelected: boolean;
    }> {
        private static _UniqueIdSeed;
        private _uniqueId;
        private _localChange;
        constructor(props: ICheckBoxLineComponentProps);
        shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
            isSelected: boolean;
        }): boolean;
        onChange(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IRenderGridPropertyGridComponentProps {
        globalState: GlobalState;
        scene: BABYLON.Scene;
    }
    export class RenderGridPropertyGridComponent extends React.Component<IRenderGridPropertyGridComponentProps, {
        isEnabled: boolean;
    }> {
        private _gridMesh;
        constructor(props: IRenderGridPropertyGridComponentProps);
        componentDidMount(): void;
        addOrRemoveGrid(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export class DebugTabComponent extends PaneComponent {
        private _physicsViewersEnabled;
        constructor(props: IPaneComponentProps);
        switchPhysicsViewers(): void;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    /**
     * Class used to provide lock mechanism
     */
    export class LockObject {
        /**
         * Gets or set if the lock is engaged
         */
        lock: boolean;
    }
}
declare module INSPECTOR {
    interface IFloatLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject?: LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        max?: number;
        smallUI?: boolean;
        onEnter?: (newValue: number) => void;
    }
    export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
        value: string;
    }> {
        private _localChange;
        private _store;
        constructor(props: IFloatLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
            value: string;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISliderLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        minimum: number;
        maximum: number;
        step: number;
        directValue?: number;
        useEuler?: boolean;
        onChange?: (value: number) => void;
        onInput?: (value: number) => void;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        decimalCount?: number;
        margin?: boolean;
    }
    export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
        value: number;
    }> {
        private _localChange;
        constructor(props: ISliderLineComponentProps);
        shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
            value: number;
        }): boolean;
        onChange(newValueString: any): void;
        onInput(newValueString: any): void;
        prepareDataToRead(value: number): number;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export const Null_Value: number;
    export class ListLineOption {
        label: string;
        value: number;
        selected?: boolean;
    }
    export interface IOptionsLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        options: ListLineOption[];
        noDirectUpdate?: boolean;
        onSelect?: (value: number) => void;
        extractValue?: () => number;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        allowNullValue?: boolean;
    }
    export class OptionsLineComponent extends React.Component<IOptionsLineComponentProps, {
        value: number;
    }> {
        private _localChange;
        private remapValueIn;
        private remapValueOut;
        constructor(props: IOptionsLineComponentProps);
        shouldComponentUpdate(nextProps: IOptionsLineComponentProps, nextState: {
            value: number;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        updateValue(valueString: string): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface INumericInputComponentProps {
        label: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
    }
    export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputComponentProps);
        shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
            value: string;
        }): boolean;
        updateValue(evt: any): void;
        onBlur(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
    }
    export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
    }
    export class HexColor extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        updateHexValue(valueString: string): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerProps {
        color: BABYLON.Color3 | BABYLON.Color4;
        debugMode?: boolean;
        onColorChanged?: (color: BABYLON.Color3 | BABYLON.Color4) => void;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: BABYLON.Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class BABYLON.GUI.ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerProps);
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IColorPickerComponentProps {
        value: BABYLON.Color4 | BABYLON.Color3;
        onColorChanged: (newOne: string) => void;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: BABYLON.Color3 | BABYLON.Color4;
        hex: string;
    }
    export class ColorPickerLineComponent extends React.Component<IColorPickerComponentProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        constructor(props: IColorPickerComponentProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerComponentState): boolean;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IColor3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        isLinear?: boolean;
    }
    export class Color3LineComponent extends React.Component<IColor3LineComponentProps, {
        isExpanded: boolean;
        color: BABYLON.Color3;
    }> {
        private _localChange;
        constructor(props: IColor3LineComponentProps);
        shouldComponentUpdate(nextProps: IColor3LineComponentProps, nextState: {
            color: BABYLON.Color3;
        }): boolean;
        setPropertyValue(newColor: BABYLON.Color3): void;
        onChange(newValue: string): void;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Color3): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        copyToClipboard(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IVector3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector3) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        noSlider?: boolean;
    }
    export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector3;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector3LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector3;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector3): void;
        updateVector3(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IQuaternionLineComponentProps {
        label: string;
        target: any;
        useEuler?: boolean;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class QuaternionLineComponent extends React.Component<IQuaternionLineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Quaternion;
        eulerValue: BABYLON.Vector3;
    }> {
        private _localChange;
        constructor(props: IQuaternionLineComponentProps);
        _checkRoundCircle(a: number, b: number): boolean;
        shouldComponentUpdate(nextProps: IQuaternionLineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Quaternion;
            eulerValue: BABYLON.Vector3;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(currentValue: BABYLON.Quaternion, previousValue: BABYLON.Quaternion): void;
        updateQuaternion(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        updateStateW(value: number): void;
        updateQuaternionFromEuler(): void;
        updateStateEulerX(value: number): void;
        updateStateEulerY(value: number): void;
        updateStateEulerZ(value: number): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITextInputLineComponentProps {
        label: string;
        lockObject: LockObject;
        target?: any;
        propertyName?: string;
        value?: string;
        onChange?: (value: string) => void;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
        value: string;
    }> {
        private _localChange;
        constructor(props: ITextInputLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
            value: string;
        }): boolean;
        raiseOnPropertyChanged(newValue: string, previousValue: string): void;
        updateValue(value: string): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICustomPropertyGridComponentProps {
        globalState: GlobalState;
        target: any;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CustomPropertyGridComponent extends React.Component<ICustomPropertyGridComponentProps, {
        mode: number;
    }> {
        constructor(props: ICustomPropertyGridComponentProps);
        renderInspectable(inspectable: BABYLON.IInspectable): JSX.Element | null;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    export interface IButtonLineComponentProps {
        label: string;
        onClick: () => void;
    }
    export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IAnimationGridComponentProps {
        globalState: GlobalState;
        animatable: BABYLON.IAnimatable;
        scene: BABYLON.Scene;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class AnimationGridComponent extends React.Component<IAnimationGridComponentProps, {
        currentFrame: number;
    }> {
        private _animations;
        private _ranges;
        private _mainAnimatable;
        private _onBeforeRenderObserver;
        private _isPlaying;
        private timelineRef;
        private _animationControl;
        constructor(props: IAnimationGridComponentProps);
        playOrPause(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        onCurrentFrameChange(value: number): void;
        onChangeFromOrTo(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.Material;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonMaterialPropertyGridComponent extends React.Component<ICommonMaterialPropertyGridComponentProps> {
        constructor(props: ICommonMaterialPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.Material;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MaterialPropertyGridComponent extends React.Component<IMaterialPropertyGridComponentProps> {
        constructor(props: IMaterialPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IFileButtonLineComponentProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
    }
    export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private uploadInputRef;
        constructor(props: IFileButtonLineComponentProps);
        onChange(evt: any): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface ITextureLinkLineComponentProps {
        label: string;
        texture: BABYLON.Nullable<BABYLON.BaseTexture>;
        material?: BABYLON.Material;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onDebugSelectionChangeObservable?: BABYLON.Observable<TextureLinkLineComponent>;
        propertyName?: string;
        onTextureCreated?: (texture: BABYLON.BaseTexture) => void;
        customDebugAction?: (state: boolean) => void;
        onTextureRemoved?: () => void;
    }
    export class TextureLinkLineComponent extends React.Component<ITextureLinkLineComponentProps, {
        isDebugSelected: boolean;
    }> {
        private _onDebugSelectionChangeObserver;
        constructor(props: ITextureLinkLineComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        debugTexture(): void;
        onLink(): void;
        updateTexture(file: File): void;
        removeTexture(): void;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    interface IStandardMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.StandardMaterial;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class StandardMaterialPropertyGridComponent extends React.Component<IStandardMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IStandardMaterialPropertyGridComponentProps);
        renderTextures(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    /** @hidden */
    export var lodPixelShader: {
        name: string;
        shader: string;
    };
}
declare module INSPECTOR {
    /** @hidden */
    export var lodCubePixelShader: {
        name: string;
        shader: string;
    };
}
declare module INSPECTOR {
    export interface TextureChannelsToDisplay {
        R: boolean;
        G: boolean;
        B: boolean;
        A: boolean;
    }
    export class TextureHelper {
        private static _ProcessAsync;
        static GetTextureDataAsync(texture: BABYLON.BaseTexture, width: number, height: number, face: number, channels: TextureChannelsToDisplay, globalState?: GlobalState, lod?: number): Promise<Uint8Array>;
    }
}
declare module INSPECTOR {
    interface ITextureLineComponentProps {
        texture: BABYLON.BaseTexture;
        width: number;
        height: number;
        globalState?: GlobalState;
        hideChannelSelect?: boolean;
    }
    export class TextureLineComponent extends React.Component<ITextureLineComponentProps, {
        channels: TextureChannelsToDisplay;
        face: number;
    }> {
        private canvasRef;
        private static TextureChannelStates;
        constructor(props: ITextureLineComponentProps);
        shouldComponentUpdate(nextProps: ITextureLineComponentProps, nextState: {
            channels: TextureChannelsToDisplay;
            face: number;
        }): boolean;
        componentDidMount(): void;
        componentDidUpdate(): void;
        updatePreview(): Promise<void>;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPopupComponentProps {
        id: string;
        title: string;
        size: {
            width: number;
            height: number;
        };
        onOpen: (window: Window) => void;
        onClose: (window: Window) => void;
    }
    export class PopupComponent extends React.Component<IPopupComponentProps, {
        isComponentMounted: boolean;
        blockedByBrowser: boolean;
    }> {
        private _container;
        private _window;
        private _curveEditorHost;
        constructor(props: IPopupComponentProps);
        componentDidMount(): void;
        openPopup(): void;
        componentWillUnmount(): void;
        getWindow(): Window | null;
        render(): React.ReactPortal | null;
    }
}
declare module INSPECTOR {
    export interface ITool extends IToolData {
        instance: IToolType;
    }
    interface IToolBarProps {
        tools: ITool[];
        addTool(url: string): void;
        changeTool(toolIndex: number): void;
        activeToolIndex: number;
        metadata: IMetadata;
        setMetadata(data: any): void;
        pickerOpen: boolean;
        setPickerOpen(open: boolean): void;
        pickerRef: React.RefObject<HTMLDivElement>;
        hasAlpha: boolean;
    }
    interface IToolBarState {
        toolURL: string;
        addOpen: boolean;
    }
    export class ToolBar extends React.Component<IToolBarProps, IToolBarState> {
        constructor(props: IToolBarProps);
        computeRGBAColor(): BABYLON.Color4;
        shouldComponentUpdate(nextProps: IToolBarProps): boolean;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IChannel {
        visible: boolean;
        editable: boolean;
        name: string;
        id: 'R' | 'G' | 'B' | 'A';
        icon: any;
    }
    interface IChannelsBarProps {
        channels: IChannel[];
        setChannels(channelState: IChannel[]): void;
    }
    export class ChannelsBar extends React.PureComponent<IChannelsBarProps> {
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export const canvasShader: {
        path: {
            vertexSource: string;
            fragmentSource: string;
        };
        options: {
            attributes: string[];
            uniforms: string[];
        };
    };
}
declare module INSPECTOR {
    export interface IPixelData {
        x?: number;
        y?: number;
        r?: number;
        g?: number;
        b?: number;
        a?: number;
    }
    export class TextureCanvasManager {
        private _engine;
        private _scene;
        private _camera;
        private _cameraPos;
        private _scale;
        private _isPanning;
        private _mouseX;
        private _mouseY;
        private _UICanvas;
        private _size;
        /** The canvas we paint onto using the canvas API */
        private _2DCanvas;
        /** The canvas we apply post processes to */
        private _3DCanvas;
        /** The canvas which handles channel filtering */
        private _channelsTexture;
        private _3DEngine;
        private _3DPlane;
        private _3DCanvasTexture;
        private _3DScene;
        private _channels;
        private _face;
        private _mipLevel;
        /** The texture from the original engine that we invoked the editor on */
        private _originalTexture;
        /** This is a hidden texture which is only responsible for holding the actual texture memory in the original engine */
        private _target;
        /** The internal texture representation of the original texture */
        private _originalInternalTexture;
        /** Keeps track of whether we have modified the texture */
        private _didEdit;
        private _plane;
        private _planeMaterial;
        /** Tracks which keys are currently pressed */
        private _keyMap;
        private readonly ZOOM_MOUSE_SPEED;
        private readonly ZOOM_KEYBOARD_SPEED;
        private readonly ZOOM_IN_KEY;
        private readonly ZOOM_OUT_KEY;
        private readonly PAN_SPEED;
        private readonly PAN_MOUSE_BUTTON;
        private readonly MIN_SCALE;
        private readonly GRID_SCALE;
        private readonly MAX_SCALE;
        private readonly SELECT_ALL_KEY;
        private readonly SAVE_KEY;
        private readonly RESET_KEY;
        private readonly DESELECT_KEY;
        /** The number of milliseconds between texture updates */
        private readonly PUSH_FREQUENCY;
        private _tool;
        private _setPixelData;
        private _setMipLevel;
        private _window;
        private _metadata;
        private _editing3D;
        private _onUpdate;
        private _setMetadata;
        private _imageData;
        private _canPush;
        private _shouldPush;
        private _paintCanvas;
        constructor(texture: BABYLON.BaseTexture, window: Window, canvasUI: HTMLCanvasElement, canvas2D: HTMLCanvasElement, canvas3D: HTMLCanvasElement, setPixelData: (pixelData: IPixelData) => void, metadata: IMetadata, onUpdate: () => void, setMetadata: (metadata: any) => void, setMipLevel: (level: number) => void);
        updateTexture(): Promise<void>;
        private pushTexture;
        startPainting(): Promise<CanvasRenderingContext2D>;
        updatePainting(): void;
        stopPainting(): void;
        private updateDisplay;
        set channels(channels: IChannel[]);
        paintPixelsOnCanvas(pixelData: Uint8Array, canvas: HTMLCanvasElement): void;
        grabOriginalTexture(): Promise<Uint8Array>;
        getMouseCoordinates(pointerInfo: BABYLON.PointerInfo): BABYLON.Vector2;
        get scene(): BABYLON.Scene;
        get canvas2D(): HTMLCanvasElement;
        get size(): BABYLON.ISize;
        set tool(tool: BABYLON.Nullable<ITool>);
        get tool(): BABYLON.Nullable<ITool>;
        set face(face: number);
        set mipLevel(mipLevel: number);
        /** Returns the 3D scene used for postprocesses */
        get scene3D(): BABYLON.Scene;
        set metadata(metadata: IMetadata);
        private makePlane;
        reset(): void;
        resize(newSize: BABYLON.ISize): Promise<void>;
        setSize(size: BABYLON.ISize): void;
        upload(file: File): void;
        saveTexture(): void;
        dispose(): void;
    }
}
declare module INSPECTOR {
    interface IPropertiesBarProps {
        texture: BABYLON.BaseTexture;
        size: BABYLON.ISize;
        saveTexture(): void;
        pixelData: IPixelData;
        face: number;
        setFace(face: number): void;
        resetTexture(): void;
        resizeTexture(width: number, height: number): void;
        uploadTexture(file: File): void;
        mipLevel: number;
        setMipLevel: (mipLevel: number) => void;
    }
    interface IPropertiesBarState {
        width: number;
        height: number;
    }
    export class PropertiesBar extends React.PureComponent<IPropertiesBarProps, IPropertiesBarState> {
        private _resetButton;
        private _uploadButton;
        private _saveButton;
        private _babylonLogo;
        private _resizeButton;
        private _mipUp;
        private _mipDown;
        private _faces;
        constructor(props: IPropertiesBarProps);
        private pixelData;
        private getNewDimension;
        componentWillUpdate(nextProps: IPropertiesBarProps): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IBottomBarProps {
        texture: BABYLON.BaseTexture;
        mipLevel: number;
    }
    export class BottomBar extends React.PureComponent<IBottomBarProps> {
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITextureCanvasComponentProps {
        canvasUI: React.RefObject<HTMLCanvasElement>;
        canvas2D: React.RefObject<HTMLCanvasElement>;
        canvas3D: React.RefObject<HTMLCanvasElement>;
        texture: BABYLON.BaseTexture;
    }
    export class TextureCanvasComponent extends React.Component<ITextureCanvasComponentProps> {
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export const Paintbrush: IToolData;
}
declare module INSPECTOR {
    export const Eyedropper: IToolData;
}
declare module INSPECTOR {
    export const Floodfill: IToolData;
}
declare module INSPECTOR {
    export const RectangleSelect: IToolData;
}
declare module INSPECTOR {
    const _default: import("babylonjs-inspector/components/actionTabs/tabs/propertyGrids/materials/textures/textureEditorComponent").IToolData[];
    export default _default;
}
declare module INSPECTOR {
    interface IToolSettingsProps {
        tool: ITool | undefined;
    }
    export class ToolSettings extends React.Component<IToolSettingsProps> {
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITextureEditorComponentProps {
        texture: BABYLON.BaseTexture;
        url: string;
        window: React.RefObject<PopupComponent>;
        onUpdate: () => void;
    }
    interface ITextureEditorComponentState {
        tools: ITool[];
        activeToolIndex: number;
        metadata: IMetadata;
        channels: IChannel[];
        pixelData: IPixelData;
        face: number;
        mipLevel: number;
        pickerOpen: boolean;
    }
    export interface IToolParameters {
        /** The visible scene in the editor. Useful for adding pointer and keyboard events. */
        scene: BABYLON.Scene;
        /** The 2D canvas which you can sample pixel data from. Tools should not paint directly on this canvas. */
        canvas2D: HTMLCanvasElement;
        /** The 3D scene which tools can add post processes to. */
        scene3D: BABYLON.Scene;
        /** The size of the texture. */
        size: BABYLON.ISize;
        /** Pushes the editor texture back to the original scene. This should be called every time a tool makes any modification to a texture. */
        updateTexture: () => void;
        /** The metadata object which is shared between all tools. Feel free to store any information here. Do not set this directly: instead call setMetadata. */
        metadata: IMetadata;
        /** Call this when you want to mutate the metadata. */
        setMetadata: (data: any) => void;
        /** Returns the texture coordinates under the cursor */
        getMouseCoordinates: (pointerInfo: BABYLON.PointerInfo) => BABYLON.Vector2;
        /** Provides access to the BABYLON namespace */
        BABYLON: any;
        /** Provides a canvas that you can use the canvas API to paint on. */
        startPainting: () => Promise<CanvasRenderingContext2D>;
        /** After you have painted on your canvas, call this method to push the updates back to the texture. */
        updatePainting: () => void;
        /** Call this when you are finished painting. */
        stopPainting: () => void;
    }
    export interface IToolGUIProps {
        instance: IToolType;
    }
    /** An interface representing the definition of a tool */
    export interface IToolData {
        /** Name to display on the toolbar */
        name: string;
        /** A class definition for the tool including setup and cleanup methods */
        type: IToolConstructable;
        /**  An SVG icon encoded in Base64 */
        icon: string;
        /** Whether the tool uses postprocesses */
        is3D?: boolean;
        cursor?: string;
        settingsComponent?: React.ComponentType<IToolGUIProps>;
    }
    export interface IToolType {
        /** Called when the tool is selected. */
        setup: () => void;
        /** Called when the tool is deselected. */
        cleanup: () => void;
        /** Optional. Called when the user resets the texture or uploads a new texture. Tools may want to reset their state when this happens. */
        onReset?: () => void;
    }
    /** For constructable types, TS requires that you define a seperate interface which constructs your actual interface */
    interface IToolConstructable {
        new (getParameters: () => IToolParameters): IToolType;
    }
    export interface IMetadata {
        color: string;
        alpha: number;
        select: {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        [key: string]: any;
    }
    global {
        var _TOOL_DATA_: IToolData;
    }
    export class TextureEditorComponent extends React.Component<ITextureEditorComponentProps, ITextureEditorComponentState> {
        private _textureCanvasManager;
        private _UICanvas;
        private _2DCanvas;
        private _3DCanvas;
        private _pickerRef;
        private _timer;
        private static PREVIEW_UPDATE_DELAY_MS;
        constructor(props: ITextureEditorComponentProps);
        componentDidMount(): void;
        componentDidUpdate(): void;
        componentWillUnmount(): void;
        textureDidUpdate(): void;
        loadToolFromURL(url: string): void;
        addTools(tools: IToolData[]): void;
        getToolParameters(): IToolParameters;
        changeTool(index: number): void;
        setMetadata(newMetadata: any): void;
        setPickerOpen(open: boolean): void;
        onPointerDown(evt: React.PointerEvent): void;
        saveTexture(): void;
        resetTexture(): void;
        resizeTexture(width: number, height: number): void;
        uploadTexture(file: File): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITexturePropertyGridComponentProps {
        texture: BABYLON.BaseTexture;
        lockObject: LockObject;
        globalState: GlobalState;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    interface ITexturePropertyGridComponentState {
        isTextureEditorOpen: boolean;
        textureEditing: BABYLON.Nullable<BABYLON.BaseTexture>;
    }
    export class TexturePropertyGridComponent extends React.Component<ITexturePropertyGridComponentProps, ITexturePropertyGridComponentState> {
        private _adtInstrumentation;
        private popoutWindowRef;
        private textureLineRef;
        private _textureInspectorSize;
        constructor(props: ITexturePropertyGridComponentProps);
        componentWillUnmount(): void;
        updateTexture(file: File): void;
        openTextureEditor(): void;
        onOpenTextureEditor(window: Window): void;
        onCloseTextureEditor(callback?: {
            (): void;
        }): void;
        forceRefresh(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IVector2LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector2) => void;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector2;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector2LineComponentProps);
        shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector2;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector2): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPBRMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.PBRMaterial;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PBRMaterialPropertyGridComponent extends React.Component<IPBRMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IPBRMaterialPropertyGridComponentProps);
        switchAmbientMode(state: boolean): void;
        renderTextures(onDebugSelectionChangeObservable: BABYLON.Observable<TextureLinkLineComponent>): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IRadioButtonLineComponentProps {
        onSelectionChangedObservable: BABYLON.Observable<RadioButtonLineComponent>;
        label: string;
        isSelected: () => boolean;
        onSelect: () => void;
    }
    export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
        isSelected: boolean;
    }> {
        private _onSelectionChangedObserver;
        constructor(props: IRadioButtonLineComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        onChange(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IFogPropertyGridComponentProps {
        globalState: GlobalState;
        scene: BABYLON.Scene;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class FogPropertyGridComponent extends React.Component<IFogPropertyGridComponentProps, {
        mode: number;
    }> {
        constructor(props: IFogPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IScenePropertyGridComponentProps {
        globalState: GlobalState;
        scene: BABYLON.Scene;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class ScenePropertyGridComponent extends React.Component<IScenePropertyGridComponentProps> {
        private _storedEnvironmentTexture;
        private _renderingModeGroupObservable;
        constructor(props: IScenePropertyGridComponentProps);
        setRenderingModes(point: boolean, wireframe: boolean): void;
        switchIBL(): void;
        updateEnvironmentTexture(file: File): void;
        updateGravity(newValue: BABYLON.Vector3): void;
        updateTimeStep(newValue: number): void;
        normalizeScene(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.Light;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonLightPropertyGridComponent extends React.Component<ICommonLightPropertyGridComponentProps> {
        constructor(props: ICommonLightPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IHemisphericLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.HemisphericLight;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class HemisphericLightPropertyGridComponent extends React.Component<IHemisphericLightPropertyGridComponentProps> {
        constructor(props: IHemisphericLightPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonShadowLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.IShadowLight;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonShadowLightPropertyGridComponent extends React.Component<ICommonShadowLightPropertyGridComponentProps> {
        private _internals;
        constructor(props: ICommonShadowLightPropertyGridComponentProps);
        createShadowGenerator(): void;
        disposeShadowGenerator(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPointLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.PointLight;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PointLightPropertyGridComponent extends React.Component<IPointLightPropertyGridComponentProps> {
        constructor(props: IPointLightPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IHexLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject?: LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        replaySourceReplacement?: string;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
    }
    export class HexLineComponent extends React.Component<IHexLineComponentProps, {
        value: string;
    }> {
        private _localChange;
        private _store;
        private _propertyChange;
        constructor(props: IHexLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
            value: string;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        convertToHexString(valueString: string): string;
        updateValue(valueString: string, raisePropertyChanged: boolean): void;
        lock(): void;
        unlock(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.Camera;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonCameraPropertyGridComponent extends React.Component<ICommonCameraPropertyGridComponentProps, {
        mode: number;
    }> {
        constructor(props: ICommonCameraPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IFreeCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.FreeCamera;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class FreeCameraPropertyGridComponent extends React.Component<IFreeCameraPropertyGridComponentProps> {
        constructor(props: IFreeCameraPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IArcRotateCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.ArcRotateCamera;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ArcRotateCameraPropertyGridComponent extends React.Component<IArcRotateCameraPropertyGridComponentProps> {
        constructor(props: IArcRotateCameraPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IIndentedTextLineComponentProps {
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        additionalClass?: string;
    }
    export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
        constructor(props: IIndentedTextLineComponentProps);
        onLink(): void;
        renderContent(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonPropertyGridComponentProps {
        globalState: GlobalState;
        host: {
            metadata: any;
        };
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonPropertyGridComponent extends React.Component<ICommonPropertyGridComponentProps> {
        constructor(props: ICommonPropertyGridComponentProps);
        renderLevel(jsonObject: any): JSX.Element[];
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    interface IVariantsPropertyGridComponentProps {
        globalState: GlobalState;
        host: any;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class VariantsPropertyGridComponent extends React.Component<IVariantsPropertyGridComponentProps> {
        constructor(props: IVariantsPropertyGridComponentProps);
        private _getVariantsExtension;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    interface IMeshPropertyGridComponentProps {
        globalState: GlobalState;
        mesh: BABYLON.Mesh;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MeshPropertyGridComponent extends React.Component<IMeshPropertyGridComponentProps, {
        displayNormals: boolean;
        displayVertexColors: boolean;
        displayBoneWeights: boolean;
        displayBoneIndex: number;
        displaySkeletonMap: boolean;
    }> {
        constructor(props: IMeshPropertyGridComponentProps);
        renderWireframeOver(): void;
        renderNormalVectors(): void;
        displayNormals(): void;
        displayVertexColors(): void;
        displayBoneWeights(): void;
        displaySkeletonMap(): void;
        onBoneDisplayIndexChange(value: number): void;
        onMaterialLink(): void;
        onSourceMeshLink(): void;
        onSkeletonLink(): void;
        convertPhysicsTypeToString(): string;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITransformNodePropertyGridComponentProps {
        globalState: GlobalState;
        transformNode: BABYLON.TransformNode;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class TransformNodePropertyGridComponent extends React.Component<ITransformNodePropertyGridComponentProps> {
        constructor(props: ITransformNodePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IBackgroundMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.BackgroundMaterial;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class BackgroundMaterialPropertyGridComponent extends React.Component<IBackgroundMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IBackgroundMaterialPropertyGridComponentProps);
        renderTextures(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonControlPropertyGridComponentProps {
        globalState: GlobalState;
        control: BABYLON.GUI.Control;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
        constructor(props: ICommonControlPropertyGridComponentProps);
        renderGridInformation(): JSX.Element | null;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IControlPropertyGridComponentProps {
        globalState: GlobalState;
        control: BABYLON.GUI.Control;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
        constructor(props: IControlPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITextBlockPropertyGridComponentProps {
        globalState: GlobalState;
        textBlock: BABYLON.GUI.TextBlock;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
        constructor(props: ITextBlockPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IInputTextPropertyGridComponentProps {
        globalState: GlobalState;
        inputText: BABYLON.GUI.InputText;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
        constructor(props: IInputTextPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IColorPickerPropertyGridComponentProps {
        globalState: GlobalState;
        colorPicker: BABYLON.GUI.ColorPicker;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
        constructor(props: IColorPickerPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IAnimationGroupGridComponentProps {
        globalState: GlobalState;
        animationGroup: BABYLON.AnimationGroup;
        scene: BABYLON.Scene;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class AnimationGroupGridComponent extends React.Component<IAnimationGroupGridComponentProps, {
        playButtonText: string;
        currentFrame: number;
    }> {
        private _onAnimationGroupPlayObserver;
        private _onAnimationGroupPauseObserver;
        private _onBeforeRenderObserver;
        private timelineRef;
        constructor(props: IAnimationGroupGridComponentProps);
        disconnect(animationGroup: BABYLON.AnimationGroup): void;
        connect(animationGroup: BABYLON.AnimationGroup): void;
        updateCurrentFrame(animationGroup: BABYLON.AnimationGroup): void;
        shouldComponentUpdate(nextProps: IAnimationGroupGridComponentProps): boolean;
        componentWillUnmount(): void;
        playOrPause(): void;
        onCurrentFrameChange(value: number): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IImagePropertyGridComponentProps {
        globalState: GlobalState;
        image: BABYLON.GUI.Image;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
        constructor(props: IImagePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISliderPropertyGridComponentProps {
        globalState: GlobalState;
        slider: BABYLON.GUI.Slider;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
        constructor(props: ISliderPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IImageBasedSliderPropertyGridComponentProps {
        globalState: GlobalState;
        imageBasedSlider: BABYLON.GUI.ImageBasedSlider;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
        constructor(props: IImageBasedSliderPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IRectanglePropertyGridComponentProps {
        globalState: GlobalState;
        rectangle: BABYLON.GUI.Rectangle;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
        constructor(props: IRectanglePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IEllipsePropertyGridComponentProps {
        globalState: GlobalState;
        ellipse: BABYLON.GUI.Ellipse;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
        constructor(props: IEllipsePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICheckboxPropertyGridComponentProps {
        globalState: GlobalState;
        checkbox: BABYLON.GUI.Checkbox;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
        constructor(props: ICheckboxPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IRadioButtonPropertyGridComponentProps {
        globalState: GlobalState;
        radioButton: BABYLON.GUI.RadioButton;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
        constructor(props: IRadioButtonPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ILinePropertyGridComponentProps {
        globalState: GlobalState;
        line: BABYLON.GUI.Line;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
        constructor(props: ILinePropertyGridComponentProps);
        onDashChange(value: string): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IScrollViewerPropertyGridComponentProps {
        globalState: GlobalState;
        scrollViewer: BABYLON.GUI.ScrollViewer;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
        constructor(props: IScrollViewerPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IGridPropertyGridComponentProps {
        globalState: GlobalState;
        grid: BABYLON.GUI.Grid;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
        constructor(props: IGridPropertyGridComponentProps);
        renderRows(): JSX.Element[];
        renderColumns(): JSX.Element[];
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPBRMetallicRoughnessMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.PBRMetallicRoughnessMaterial;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PBRMetallicRoughnessMaterialPropertyGridComponent extends React.Component<IPBRMetallicRoughnessMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IPBRMetallicRoughnessMaterialPropertyGridComponentProps);
        renderTextures(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPBRSpecularGlossinessMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.PBRSpecularGlossinessMaterial;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PBRSpecularGlossinessMaterialPropertyGridComponent extends React.Component<IPBRSpecularGlossinessMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IPBRSpecularGlossinessMaterialPropertyGridComponentProps);
        renderTextures(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IStackPanelPropertyGridComponentProps {
        globalState: GlobalState;
        stackPanel: BABYLON.GUI.StackPanel;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
        constructor(props: IStackPanelPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonPostProcessPropertyGridComponentProps {
        globalState: GlobalState;
        postProcess: BABYLON.PostProcess;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonPostProcessPropertyGridComponent extends React.Component<ICommonPostProcessPropertyGridComponentProps> {
        constructor(props: ICommonPostProcessPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPostProcessPropertyGridComponentProps {
        globalState: GlobalState;
        postProcess: BABYLON.PostProcess;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PostProcessPropertyGridComponent extends React.Component<IPostProcessPropertyGridComponentProps> {
        constructor(props: IPostProcessPropertyGridComponentProps);
        edit(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICommonRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.PostProcessRenderPipeline;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonRenderingPipelinePropertyGridComponent extends React.Component<ICommonRenderingPipelinePropertyGridComponentProps> {
        constructor(props: ICommonRenderingPipelinePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.PostProcessRenderPipeline;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class RenderingPipelinePropertyGridComponent extends React.Component<IRenderingPipelinePropertyGridComponentProps> {
        constructor(props: IRenderingPipelinePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IDefaultRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.DefaultRenderingPipeline;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class DefaultRenderingPipelinePropertyGridComponent extends React.Component<IDefaultRenderingPipelinePropertyGridComponentProps> {
        constructor(props: IDefaultRenderingPipelinePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISSAORenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.SSAORenderingPipeline;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SSAORenderingPipelinePropertyGridComponent extends React.Component<ISSAORenderingPipelinePropertyGridComponentProps> {
        constructor(props: ISSAORenderingPipelinePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISSAO2RenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.SSAO2RenderingPipeline;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SSAO2RenderingPipelinePropertyGridComponent extends React.Component<ISSAO2RenderingPipelinePropertyGridComponentProps> {
        constructor(props: ISSAO2RenderingPipelinePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISkeletonPropertyGridComponentProps {
        globalState: GlobalState;
        skeleton: BABYLON.Skeleton;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SkeletonPropertyGridComponent extends React.Component<ISkeletonPropertyGridComponentProps> {
        private _skeletonViewersEnabled;
        private _skeletonViewerDisplayOptions;
        private _skeletonViewers;
        constructor(props: ISkeletonPropertyGridComponentProps);
        switchSkeletonViewers(): void;
        checkSkeletonViewerState(props: ISkeletonPropertyGridComponentProps): void;
        changeDisplayMode(): void;
        changeDisplayOptions(option: string, value: number): void;
        shouldComponentUpdate(nextProps: ISkeletonPropertyGridComponentProps): boolean;
        onOverrideMeshLink(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IBonePropertyGridComponentProps {
        globalState: GlobalState;
        bone: BABYLON.Bone;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class BonePropertyGridComponent extends React.Component<IBonePropertyGridComponentProps> {
        constructor(props: IBonePropertyGridComponentProps);
        onTransformNodeLink(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IDirectionalLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.DirectionalLight;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class DirectionalLightPropertyGridComponent extends React.Component<IDirectionalLightPropertyGridComponentProps> {
        constructor(props: IDirectionalLightPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISpotLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.SpotLight;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SpotLightPropertyGridComponent extends React.Component<ISpotLightPropertyGridComponentProps> {
        constructor(props: ISpotLightPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ILenstRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.LensRenderingPipeline;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class LensRenderingPipelinePropertyGridComponent extends React.Component<ILenstRenderingPipelinePropertyGridComponentProps> {
        constructor(props: ILenstRenderingPipelinePropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IVector4LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector4) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector4;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector4LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector4;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector4): void;
        updateVector4(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        updateStateW(value: number): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IColor4LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
    }
    export class Color4LineComponent extends React.Component<IColor4LineComponentProps, {
        isExpanded: boolean;
        color: BABYLON.Color4;
    }> {
        private _localChange;
        constructor(props: IColor4LineComponentProps);
        shouldComponentUpdate(nextProps: IColor4LineComponentProps, nextState: {
            color: BABYLON.Color4;
        }): boolean;
        setPropertyValue(newColor: BABYLON.Color4): void;
        onChange(newValue: string): void;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Color4): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        copyToClipboard(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IGradientStepComponentProps {
        globalState: GlobalState;
        step: BABYLON.GradientBlockColorStep;
        lineIndex: number;
        onDelete: () => void;
        onUpdateStep: () => void;
        onCheckForReOrder: () => void;
        onCopy?: () => void;
    }
    export class GradientStepComponent extends React.Component<IGradientStepComponentProps, {
        gradient: number;
    }> {
        constructor(props: IGradientStepComponentProps);
        updateColor(color: string): void;
        updateStep(gradient: number): void;
        onPointerUp(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IPropertyComponentProps {
        globalState: GlobalState;
        block: BABYLON.NodeMaterialBlock;
    }
}
declare module INSPECTOR {
    export class GradientPropertyTabComponent extends React.Component<IPropertyComponentProps> {
        private _gradientBlock;
        constructor(props: IPropertyComponentProps);
        forceRebuild(): void;
        deleteStep(step: BABYLON.GradientBlockColorStep): void;
        copyStep(step: BABYLON.GradientBlockColorStep): void;
        addNewStep(): void;
        checkForReOrder(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface INodeMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.NodeMaterial;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class NodeMaterialPropertyGridComponent extends React.Component<INodeMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: INodeMaterialPropertyGridComponentProps);
        edit(): void;
        renderTextures(): JSX.Element | null;
        renderInputBlock(block: BABYLON.InputBlock): JSX.Element | null;
        renderInputValues(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IMultiMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.MultiMaterial;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MultiMaterialPropertyGridComponent extends React.Component<IMultiMaterialPropertyGridComponentProps> {
        constructor(props: IMultiMaterialPropertyGridComponentProps);
        onMaterialLink(mat: BABYLON.Material): void;
        renderChildMaterial(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IBoxEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.BoxParticleEmitter;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class BoxEmitterGridComponent extends React.Component<IBoxEmitterGridComponentProps> {
        constructor(props: IBoxEmitterGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IConeEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.ConeParticleEmitter;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ConeEmitterGridComponent extends React.Component<IConeEmitterGridComponentProps> {
        constructor(props: IConeEmitterGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICylinderEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.CylinderParticleEmitter;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CylinderEmitterGridComponent extends React.Component<ICylinderEmitterGridComponentProps> {
        constructor(props: ICylinderEmitterGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IHemisphericEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.HemisphericParticleEmitter;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class HemisphericEmitterGridComponent extends React.Component<IHemisphericEmitterGridComponentProps> {
        constructor(props: IHemisphericEmitterGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPointEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.PointParticleEmitter;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PointEmitterGridComponent extends React.Component<IPointEmitterGridComponentProps> {
        constructor(props: IPointEmitterGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISphereEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.SphereParticleEmitter;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SphereEmitterGridComponent extends React.Component<ISphereEmitterGridComponentProps> {
        constructor(props: ISphereEmitterGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IMeshPickerComponentProps {
        globalState: GlobalState;
        target: any;
        property: string;
        scene: BABYLON.Scene;
        label: string;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MeshPickerComponent extends React.Component<IMeshPickerComponentProps> {
        constructor(props: IMeshPickerComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IMeshEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.MeshParticleEmitter;
        scene: BABYLON.Scene;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MeshEmitterGridComponent extends React.Component<IMeshEmitterGridComponentProps> {
        constructor(props: IMeshEmitterGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IFactorGradientStepGridComponent {
        globalState: GlobalState;
        gradient: BABYLON.FactorGradient;
        lockObject: LockObject;
        lineIndex: number;
        onDelete: () => void;
        onUpdateGradient: () => void;
        onCheckForReOrder: () => void;
        host: BABYLON.IParticleSystem;
        codeRecorderPropertyName: string;
    }
    export class FactorGradientStepGridComponent extends React.Component<IFactorGradientStepGridComponent, {
        gradient: number;
        factor1: string;
        factor2?: string;
    }> {
        constructor(props: IFactorGradientStepGridComponent);
        shouldComponentUpdate(nextProps: IFactorGradientStepGridComponent, nextState: {
            gradient: number;
            factor1: string;
            factor2?: string;
        }): boolean;
        updateFactor1(valueString: string): void;
        updateFactor2(valueString: string): void;
        updateGradient(gradient: number): void;
        onPointerUp(): void;
        lock(): void;
        unlock(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IColorGradientStepGridComponent {
        globalState: GlobalState;
        gradient: BABYLON.ColorGradient | BABYLON.Color3Gradient;
        lockObject: LockObject;
        lineIndex: number;
        isColor3: boolean;
        onDelete: () => void;
        onUpdateGradient: () => void;
        onCheckForReOrder: () => void;
        host: BABYLON.IParticleSystem;
        codeRecorderPropertyName: string;
    }
    export class ColorGradientStepGridComponent extends React.Component<IColorGradientStepGridComponent, {
        gradient: number;
    }> {
        constructor(props: IColorGradientStepGridComponent);
        updateColor1(color: string): void;
        updateColor2(color: string): void;
        updateGradient(gradient: number): void;
        onPointerUp(): void;
        lock(): void;
        unlock(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ILinkButtonComponentProps {
        label: string;
        buttonLabel: string;
        url?: string;
        onClick: () => void;
        onIconClick?: () => void;
    }
    export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
        constructor(props: ILinkButtonComponentProps);
        onLink(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export enum GradientGridMode {
        Factor = 0,
        BABYLON.Color3 = 1,
        BABYLON.Color4 = 2
    }
    interface IValueGradientGridComponent {
        globalState: GlobalState;
        label: string;
        gradients: BABYLON.Nullable<Array<BABYLON.IValueGradient>>;
        lockObject: LockObject;
        docLink?: string;
        mode: GradientGridMode;
        host: BABYLON.IParticleSystem;
        codeRecorderPropertyName: string;
        onCreateRequired: () => void;
    }
    export class ValueGradientGridComponent extends React.Component<IValueGradientGridComponent> {
        constructor(props: IValueGradientGridComponent);
        deleteStep(step: BABYLON.IValueGradient): void;
        addNewStep(): void;
        checkForReOrder(): void;
        updateAndSync(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IParticleSystemPropertyGridComponentProps {
        globalState: GlobalState;
        system: BABYLON.IParticleSystem;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ParticleSystemPropertyGridComponent extends React.Component<IParticleSystemPropertyGridComponentProps> {
        private _snippetUrl;
        constructor(props: IParticleSystemPropertyGridComponentProps);
        renderEmitter(): JSX.Element | null;
        raiseOnPropertyChanged(property: string, newValue: any, previousValue: any): void;
        renderControls(): JSX.Element;
        saveToFile(): void;
        loadFromFile(file: File): void;
        loadFromSnippet(): void;
        saveToSnippet(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISpriteManagerPropertyGridComponentProps {
        globalState: GlobalState;
        spriteManager: BABYLON.SpriteManager;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SpriteManagerPropertyGridComponent extends React.Component<ISpriteManagerPropertyGridComponentProps> {
        private _snippetUrl;
        constructor(props: ISpriteManagerPropertyGridComponentProps);
        addNewSprite(): void;
        disposeManager(): void;
        saveToFile(): void;
        loadFromFile(file: File): void;
        loadFromSnippet(): void;
        saveToSnippet(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISpritePropertyGridComponentProps {
        globalState: GlobalState;
        sprite: BABYLON.Sprite;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class SpritePropertyGridComponent extends React.Component<ISpritePropertyGridComponentProps> {
        private canvasRef;
        private imageData;
        private cachedCellIndex;
        constructor(props: ISpritePropertyGridComponentProps);
        onManagerLink(): void;
        switchPlayStopState(): void;
        disposeSprite(): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        shouldComponentUpdate(nextProps: ISpritePropertyGridComponentProps): boolean;
        updatePreview(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITargetedAnimationGridComponentProps {
        globalState: GlobalState;
        targetedAnimation: BABYLON.TargetedAnimation;
        scene: BABYLON.Scene;
        lockObject: LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class TargetedAnimationGridComponent extends React.Component<ITargetedAnimationGridComponentProps> {
        private _animationGroup;
        constructor(props: ITargetedAnimationGridComponentProps);
        playOrPause: () => void;
        deleteAnimation: () => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IFollowCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.FollowCamera;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class FollowCameraPropertyGridComponent extends React.Component<IFollowCameraPropertyGridComponentProps> {
        constructor(props: IFollowCameraPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISoundPropertyGridComponentProps {
        globalState: GlobalState;
        sound: BABYLON.Sound;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SoundPropertyGridComponent extends React.Component<ISoundPropertyGridComponentProps> {
        constructor(props: ISoundPropertyGridComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export class PropertyGridTabComponent extends PaneComponent {
        private _timerIntervalId;
        private _lockObject;
        constructor(props: IPaneComponentProps);
        timerRefresh(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    export interface IHeaderComponentProps {
        title: string;
        handleBack?: boolean;
        noExpand?: boolean;
        noClose?: boolean;
        noCommands?: boolean;
        onPopup: () => void;
        onClose: () => void;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class HeaderComponent extends React.Component<IHeaderComponentProps, {
        isBackVisible: boolean;
    }> {
        private _backStack;
        private _onSelectionChangeObserver;
        constructor(props: IHeaderComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        goBack(): void;
        renderLogo(): JSX.Element | null;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IMessageLineComponentProps {
        text: string;
        color?: string;
    }
    export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
        constructor(props: IMessageLineComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IGLTFComponentProps {
        scene: BABYLON.Scene;
        globalState: GlobalState;
    }
    export class GLTFComponent extends React.Component<IGLTFComponentProps> {
        private _onValidationResultsUpdatedObserver;
        openValidationDetails(): void;
        prepareText(singularForm: string, count: number): string;
        componentDidMount(): void;
        componentWillUnmount(): void;
        renderValidation(): JSX.Element | null;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IFileMultipleButtonLineComponentProps {
        label: string;
        onClick: (event: any) => void;
        accept: string;
    }
    export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private uploadInputRef;
        constructor(props: IFileMultipleButtonLineComponentProps);
        onChange(evt: any): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export class ToolsTabComponent extends PaneComponent {
        private _videoRecorder;
        private _screenShotSize;
        private _gifOptions;
        private _useWidthHeight;
        private _isExporting;
        private _gifWorkerBlob;
        private _gifRecorder;
        private _previousRenderingScale;
        private _crunchingGIF;
        constructor(props: IPaneComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        captureScreenshot(): void;
        captureRender(): void;
        recordVideo(): void;
        recordGIFInternal(): void;
        recordGIF(): void;
        importAnimations(event: any): void;
        shouldExport(node: BABYLON.Node): boolean;
        exportGLTF(): void;
        exportBabylon(): void;
        createEnvTexture(): void;
        exportReplay(): void;
        startRecording(): void;
        applyDelta(file: File): void;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    export class SettingsTabComponent extends PaneComponent {
        constructor(props: IPaneComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IActionTabsComponentProps {
        scene?: BABYLON.Scene;
        noCommands?: boolean;
        noHeader?: boolean;
        noExpand?: boolean;
        noClose?: boolean;
        popupMode?: boolean;
        onPopup?: () => void;
        onClose?: () => void;
        globalState?: GlobalState;
        initialTab?: BABYLON.DebugLayerTab;
    }
    export class ActionTabsComponent extends React.Component<IActionTabsComponentProps, {
        selectedEntity: any;
        selectedIndex: number;
    }> {
        private _onSelectionChangeObserver;
        private _onTabChangedObserver;
        private _once;
        constructor(props: IActionTabsComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        changeSelectedTab(index: number): void;
        renderContent(): JSX.Element | null;
        onClose(): void;
        onPopup(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITreeItemLabelComponentProps {
        label: string;
        onClick?: () => void;
        color: string;
    }
    export class TreeItemLabelComponent extends React.Component<ITreeItemLabelComponentProps> {
        constructor(props: ITreeItemLabelComponentProps);
        onClick(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IExtensionsComponentProps {
        target: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
    }
    export class ExtensionsComponent extends React.Component<IExtensionsComponentProps, {
        popupVisible: boolean;
    }> {
        private _popup;
        private extensionRef;
        constructor(props: IExtensionsComponentProps);
        showPopup(): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    interface IMeshTreeItemComponentProps {
        mesh: BABYLON.AbstractMesh;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
        globalState: GlobalState;
    }
    export class MeshTreeItemComponent extends React.Component<IMeshTreeItemComponentProps, {
        isBoundingBoxEnabled: boolean;
        isVisible: boolean;
    }> {
        constructor(props: IMeshTreeItemComponentProps);
        showBoundingBox(): void;
        switchVisibility(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ICameraTreeItemComponentProps {
        camera: BABYLON.Camera;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
        globalState: GlobalState;
    }
    export class CameraTreeItemComponent extends React.Component<ICameraTreeItemComponentProps, {
        isActive: boolean;
        isGizmoEnabled: boolean;
    }> {
        private _onBeforeRenderObserver;
        constructor(props: ICameraTreeItemComponentProps);
        setActive(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        toggleGizmo(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ILightTreeItemComponentProps {
        light: BABYLON.Light;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
        globalState: GlobalState;
    }
    export class LightTreeItemComponent extends React.Component<ILightTreeItemComponentProps, {
        isEnabled: boolean;
        isGizmoEnabled: boolean;
    }> {
        constructor(props: ILightTreeItemComponentProps);
        switchIsEnabled(): void;
        toggleGizmo(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IMaterialTreeItemComponentProps {
        material: BABYLON.Material | BABYLON.NodeMaterial;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class MaterialTreeItemComponent extends React.Component<IMaterialTreeItemComponentProps> {
        constructor(props: IMaterialTreeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITextureTreeItemComponentProps {
        texture: BABYLON.Texture;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class TextureTreeItemComponent extends React.Component<ITextureTreeItemComponentProps> {
        constructor(props: ITextureTreeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITransformNodeItemComponentProps {
        transformNode: BABYLON.TransformNode;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class TransformNodeItemComponent extends React.Component<ITransformNodeItemComponentProps> {
        constructor(props: ITransformNodeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IControlTreeItemComponentProps {
        control: BABYLON.GUI.Control;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class ControlTreeItemComponent extends React.Component<IControlTreeItemComponentProps, {
        isActive: boolean;
        isVisible: boolean;
    }> {
        constructor(props: IControlTreeItemComponentProps);
        highlight(): void;
        switchVisibility(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IAdvancedDynamicTextureTreeItemComponentProps {
        texture: BABYLON.GUI.AdvancedDynamicTexture;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onClick: () => void;
    }
    export class AdvancedDynamicTextureTreeItemComponent extends React.Component<IAdvancedDynamicTextureTreeItemComponentProps, {
        isInPickingMode: boolean;
    }> {
        private _onControlPickedObserver;
        constructor(props: IAdvancedDynamicTextureTreeItemComponentProps);
        componentWillUnmount(): void;
        onPickingMode(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IAnimationGroupItemComponentProps {
        animationGroup: BABYLON.AnimationGroup;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class AnimationGroupItemComponent extends React.Component<IAnimationGroupItemComponentProps> {
        constructor(props: IAnimationGroupItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPostProcessItemComponentProps {
        postProcess: BABYLON.PostProcess;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class PostProcessItemComponent extends React.Component<IPostProcessItemComponentProps> {
        constructor(props: IPostProcessItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IRenderPipelineItemComponenttProps {
        renderPipeline: BABYLON.PostProcessRenderPipeline;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class RenderingPipelineItemComponent extends React.Component<IRenderPipelineItemComponenttProps> {
        constructor(props: IRenderPipelineItemComponenttProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISkeletonTreeItemComponentProps {
        skeleton: BABYLON.Skeleton;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SkeletonTreeItemComponent extends React.Component<ISkeletonTreeItemComponentProps> {
        constructor(props: ISkeletonTreeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IBoneTreeItemComponenttProps {
        bone: BABYLON.Bone;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class BoneTreeItemComponent extends React.Component<IBoneTreeItemComponenttProps> {
        constructor(props: IBoneTreeItemComponenttProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IParticleSystemTreeItemComponentProps {
        system: BABYLON.IParticleSystem;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class ParticleSystemTreeItemComponent extends React.Component<IParticleSystemTreeItemComponentProps> {
        constructor(props: IParticleSystemTreeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISpriteManagerTreeItemComponentProps {
        spriteManager: BABYLON.SpriteManager;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SpriteManagerTreeItemComponent extends React.Component<ISpriteManagerTreeItemComponentProps> {
        constructor(props: ISpriteManagerTreeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISpriteTreeItemComponentProps {
        sprite: BABYLON.Sprite;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SpriteTreeItemComponent extends React.Component<ISpriteTreeItemComponentProps> {
        constructor(props: ISpriteTreeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITargetedAnimationItemComponentProps {
        targetedAnimation: BABYLON.TargetedAnimation;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class TargetedAnimationItemComponent extends React.Component<ITargetedAnimationItemComponentProps> {
        constructor(props: ITargetedAnimationItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISoundTreeItemComponentProps {
        sound: BABYLON.Sound;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SoundTreeItemComponent extends React.Component<ISoundTreeItemComponentProps> {
        constructor(props: ISoundTreeItemComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITreeItemSpecializedComponentProps {
        label: string;
        entity?: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        globalState: GlobalState;
        onClick?: () => void;
    }
    export class TreeItemSpecializedComponent extends React.Component<ITreeItemSpecializedComponentProps> {
        constructor(props: ITreeItemSpecializedComponentProps);
        onClick(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export class Tools {
        static LookForItem(item: any, selectedEntity: any): boolean;
        private static _RecursiveRemoveHiddenMeshesAndHoistChildren;
        static SortAndFilter(parent: any, items: any[]): any[];
    }
}
declare module INSPECTOR {
    export interface ITreeItemSelectableComponentProps {
        entity: any;
        selectedEntity?: any;
        mustExpand?: boolean;
        offset: number;
        globalState: GlobalState;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        filter: BABYLON.Nullable<string>;
    }
    export class TreeItemSelectableComponent extends React.Component<ITreeItemSelectableComponentProps, {
        isExpanded: boolean;
        isSelected: boolean;
    }> {
        private _wasSelected;
        constructor(props: ITreeItemSelectableComponentProps);
        switchExpandedState(): void;
        shouldComponentUpdate(nextProps: ITreeItemSelectableComponentProps, nextState: {
            isExpanded: boolean;
            isSelected: boolean;
        }): boolean;
        scrollIntoView(): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        onSelect(): void;
        renderChildren(): JSX.Element[] | null;
        render(): JSX.Element | null;
    }
}
declare module INSPECTOR {
    export interface ITreeItemComponentProps {
        items?: BABYLON.Nullable<any[]>;
        label: string;
        offset: number;
        filter: BABYLON.Nullable<string>;
        forceSubitems?: boolean;
        globalState: GlobalState;
        entity?: any;
        selectedEntity: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        contextMenuItems?: {
            label: string;
            action: () => void;
        }[];
    }
    export class TreeItemComponent extends React.Component<ITreeItemComponentProps, {
        isExpanded: boolean;
        mustExpand: boolean;
    }> {
        static _ContextMenuUniqueIdGenerator: number;
        constructor(props: ITreeItemComponentProps);
        switchExpandedState(): void;
        shouldComponentUpdate(nextProps: ITreeItemComponentProps, nextState: {
            isExpanded: boolean;
        }): boolean;
        expandAll(expand: boolean): void;
        renderContextMenu(): JSX.Element | null;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISceneTreeItemComponentProps {
        scene: BABYLON.Scene;
        onRefresh: () => void;
        selectedEntity?: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        globalState: GlobalState;
    }
    export class SceneTreeItemComponent extends React.Component<ISceneTreeItemComponentProps, {
        isSelected: boolean;
        isInPickingMode: boolean;
        gizmoMode: number;
    }> {
        private _gizmoLayerOnPointerObserver;
        private _onPointerObserver;
        private _onSelectionChangeObserver;
        private _selectedEntity;
        private _posDragEnd;
        private _scaleDragEnd;
        private _rotateDragEnd;
        constructor(props: ISceneTreeItemComponentProps);
        shouldComponentUpdate(nextProps: ISceneTreeItemComponentProps, nextState: {
            isSelected: boolean;
            isInPickingMode: boolean;
        }): boolean;
        componentDidMount(): void;
        componentWillUnmount(): void;
        onSelect(): void;
        onPickingMode(): void;
        setGizmoMode(mode: number): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISceneExplorerFilterComponentProps {
        onFilter: (filter: string) => void;
    }
    export class SceneExplorerFilterComponent extends React.Component<ISceneExplorerFilterComponentProps> {
        constructor(props: ISceneExplorerFilterComponentProps);
        render(): JSX.Element;
    }
    interface ISceneExplorerComponentProps {
        scene: BABYLON.Scene;
        noCommands?: boolean;
        noHeader?: boolean;
        noExpand?: boolean;
        noClose?: boolean;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        globalState: GlobalState;
        popupMode?: boolean;
        onPopup?: () => void;
        onClose?: () => void;
    }
    export class SceneExplorerComponent extends React.Component<ISceneExplorerComponentProps, {
        filter: BABYLON.Nullable<string>;
        selectedEntity: any;
        scene: BABYLON.Scene;
    }> {
        private _onSelectionChangeObserver;
        private _onSelectionRenamedObserver;
        private _onNewSceneAddedObserver;
        private _onNewSceneObserver;
        private sceneExplorerRef;
        private _once;
        private _hooked;
        private sceneMutationFunc;
        constructor(props: ISceneExplorerComponentProps);
        processMutation(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        filterContent(filter: string): void;
        findSiblings(parent: any, items: any[], target: any, goNext: boolean, data: {
            previousOne?: any;
            found?: boolean;
        }): boolean;
        processKeys(keyEvent: React.KeyboardEvent<HTMLDivElement>): void;
        renderContent(): JSX.Element | null;
        onClose(): void;
        onPopup(): void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IEmbedHostComponentProps {
        scene: BABYLON.Scene;
        globalState: GlobalState;
        popupMode: boolean;
        noClose?: boolean;
        noExpand?: boolean;
        onClose: () => void;
        onPopup: () => void;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        initialTab?: BABYLON.DebugLayerTab;
    }
    export class EmbedHostComponent extends React.Component<IEmbedHostComponentProps> {
        private _once;
        private splitRef;
        private topPartRef;
        private bottomPartRef;
        constructor(props: IEmbedHostComponentProps);
        componentDidMount(): void;
        renderContent(): JSX.Element;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export class Inspector {
        private static _SceneExplorerHost;
        private static _ActionTabsHost;
        private static _EmbedHost;
        private static _NewCanvasContainer;
        private static _SceneExplorerWindow;
        private static _ActionTabsWindow;
        private static _EmbedHostWindow;
        private static _Scene;
        private static _OpenedPane;
        private static _OnBeforeRenderObserver;
        static OnSelectionChangeObservable: BABYLON.Observable<any>;
        static OnPropertyChangedObservable: BABYLON.Observable<PropertyChangedEvent>;
        private static _GlobalState;
        static MarkLineContainerTitleForHighlighting(title: string): void;
        static MarkMultipleLineContainerTitlesForHighlighting(titles: string[]): void;
        private static _CopyStyles;
        private static _CreateSceneExplorer;
        private static _CreateActionTabs;
        private static _CreateEmbedHost;
        static _CreatePopup(title: string, windowVariableName: string, width?: number, height?: number, lateBinding?: boolean): HTMLDivElement | null;
        static get IsVisible(): boolean;
        static EarlyAttachToLoader(): void;
        static Show(scene: BABYLON.Scene, userOptions: Partial<BABYLON.IInspectorOptions>): void;
        static _SetNewScene(scene: BABYLON.Scene): void;
        static _CreateCanvasContainer(parentControl: HTMLElement): void;
        private static _DestroyCanvasContainer;
        private static _Cleanup;
        private static _RemoveElementFromDOM;
        static Hide(): void;
    }
}
declare module INSPECTOR {
    interface IAddAnimationProps {
        isOpen: boolean;
        close: () => void;
        entity: BABYLON.IAnimatable;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        setNotificationMessage: (message: string) => void;
        finishedUpdate: () => void;
        addedNewAnimation: (animation: BABYLON.Animation) => void;
        fps: number;
        selectedToUpdate?: BABYLON.Animation | undefined;
    }
    /**
     * Controls the creation of a new animation.
     * @property {boolean} isOpen controls if the add animation pannel is open or closed in the editor controls;
     * @property {()=>void} close sends the message to close this panel setting isOpen to false;
     * @property {IAnimatable} entity is the animation object to add the animation to;
     * @property {Observable<PropertyChangedEvent>} onPropertyChangedObservable is the registered observable
     * @property {(message: string) => void} setNotificationMessage sends the message string to display errors on the message box
     * @property {() => void} finishedUpdate tells the parent component the update on the animation collection has completed
     * @property { (animation: BABYLON.Animation) => void} addedNewAnimation sends the animation to the editor to process how its is rendered
     * @property {number} fps Frames per second of the animation.
     * @property {Animation | undefined} selectedToUpdate the selected animation so we can update the renderer curve.
     */
    export class AddAnimation extends React.Component<IAddAnimationProps, {
        animationName: string;
        animationTargetProperty: string;
        animationType: number;
        loopMode: number;
        animationTargetPath: string;
        isUpdating: boolean;
    }> {
        constructor(props: IAddAnimationProps);
        setInitialState(editingAnimation?: BABYLON.Animation): {
            animationName: string;
            animationTargetPath: string;
            animationType: number;
            loopMode: number;
            animationTargetProperty: string;
            isUpdating: boolean;
        };
        /**
         * We decide wether the animation will be added or edited
         * @param prevProps Previous props.
         * @param prevState Previous state.
         */
        componentDidUpdate(prevProps: IAddAnimationProps, prevState: any): void;
        /**
         * Updates the animation with the correct properties
         * Updates its name, loopmode and targetProperty.
         * This allows the edition of the animation in the curve editor.
         * We can only update these props for the animation.
         * Keyframes of course are updated on the curve editor.
         */
        updateAnimation: () => void;
        /**
         * Returns the animation type as string
         * @param type Type of animation so we return a string.
         */
        getTypeAsString(type: number): "Size" | "Color4" | "Vector3" | "Float" | "Quaternion" | "Vector2" | "Color3";
        /**
         * Process the creation of a new animation.
         * We verify is the property to animate is present on the object
         * We verify if the property derives from a correct class *type of animation to add an animation
         * At the end we create an empty animation named animation.
         * The animation keys array is set to empty so we can add keyframes in the editor.
         * We return the animation to the curve editor and update the entity animation collection
         */
        addAnimation: () => void;
        raiseOnPropertyChanged(newValue: BABYLON.Animation[], previousValue: BABYLON.Animation[]): void;
        raiseOnPropertyUpdated(newValue: string | number | undefined, previousValue: string | number, property: string): void;
        handlePathChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        handlePropertyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleLoopModeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IAnchorSvgPointProps {
        control: BABYLON.Vector2;
        anchor: BABYLON.Vector2;
        active: boolean;
        type: string;
        index: string;
        selected: boolean;
        selectControlPoint: (id: string) => void;
        framesInCanvasView: {
            from: number;
            to: number;
        };
    }
    /**
     * Renders the control point to a keyframe.
     * Each keyframe has left and right control points to control de tangent of the curve
     * This controls the inTangent and outTangent values for the keyframe in the animation.
     * @property {Vector2} control is the control point to control de curve tangent
     * @property {Vector2} anchor represents the Keyframe point which acts origin point.
     * @property {boolen} active tells the component if the control point is currently active
     * @property {string} type (left/right) if the control will be the left or right control point
     * @property {boolean} selected if the control point is currently selected. If selected we can move the control point and will become active
     * @property {(id: string) => void;} selectControlPoint sends the id of the control point to the parent component to tell if it is selected
     * @property {{ from: number; to: number }} framesInCanvasView controls from/to which keyframe should the control point can expand and control de curve
     * The frames in canvas tells us how many frames are currently visible in the canvas and therefore control the width of the line between the control and anchor point
     */
    export class AnchorSvgPoint extends React.Component<IAnchorSvgPointProps, {
        visiblePoint: BABYLON.Vector2;
    }> {
        constructor(props: IAnchorSvgPointProps);
        componentDidUpdate(prevProps: IAnchorSvgPointProps, prevState: any): void;
        select: () => void;
        /**
         * Controls where should we render the visible point (representing the control point)
         * The visible control point differs from the control point for UX reasons. The control point
         * expands beyond the visible canvas.
         */
        setVisiblePoint(): BABYLON.Vector2;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IKeyframeSvgPoint {
        keyframePoint: BABYLON.Vector2;
        rightControlPoint: BABYLON.Vector2 | null;
        leftControlPoint: BABYLON.Vector2 | null;
        id: string;
        selected: boolean;
        isLeftActive: boolean;
        isRightActive: boolean;
        curveId?: ICurveMetaData;
    }
    export interface ICurveMetaData {
        id: number;
        animationName: string;
        property: string;
    }
    interface IKeyframeSvgPointProps {
        keyframePoint: BABYLON.Vector2;
        leftControlPoint: BABYLON.Vector2 | null;
        rightControlPoint: BABYLON.Vector2 | null;
        id: string;
        selected: boolean;
        selectKeyframe: (id: string, multiselect: boolean) => void;
        selectedControlPoint: (type: string, id: string) => void;
        isLeftActive: boolean;
        isRightActive: boolean;
        framesInCanvasView: {
            from: number;
            to: number;
        };
    }
    /**
     * Renders the Keyframe as an SVG Element for the Canvas component.
     * Holds the two control points to generate the proper curve.
     */
    export class KeyframeSvgPoint extends React.Component<IKeyframeSvgPointProps> {
        constructor(props: IKeyframeSvgPointProps);
        /**
         * Select a keyframe. If the control key is pressed, multiselect keyframes
         * @param e Mouse event
         */
        select: (e: React.MouseEvent<SVGImageElement>) => void;
        /**
         * Send the ID of the selected keyframe
         * @param type Type of selected keyframe
         */
        selectedControlPointId: (type: string) => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISvgDraggableAreaProps {
        keyframeSvgPoints: IKeyframeSvgPoint[];
        updatePosition: (updatedKeyframe: IKeyframeSvgPoint, id: string) => void;
        scale: number;
        viewBoxScale: number;
        deselectKeyframes: () => void;
        removeSelectedKeyframes: (points: IKeyframeSvgPoint[]) => void;
        panningY: (panningY: number) => void;
        panningX: (panningX: number) => void;
        setCurrentFrame: (direction: number) => void;
        positionCanvas?: BABYLON.Vector2;
        repositionCanvas?: boolean;
        canvasPositionEnded: () => void;
        resetActionableKeyframe: () => void;
        framesInCanvasView: {
            from: number;
            to: number;
        };
        framesResized: number;
    }
    /**
     * The SvgDraggableArea is a wrapper for SVG Canvas the interaction
     *
     * Here we control the drag and key behavior for the SVG components.
     */
    export class SvgDraggableArea extends React.Component<ISvgDraggableAreaProps, {
        panX: number;
        panY: number;
    }> {
        private _active;
        private _isCurrentPointControl;
        private _currentPointId;
        private _draggableArea;
        private _panStart;
        private _panStop;
        private _playheadDrag;
        private _playheadSelected;
        private _movedX;
        private _movedY;
        private _isControlKeyPress;
        readonly _dragBuffer: number;
        readonly _draggingMultiplier: number;
        constructor(props: ISvgDraggableAreaProps);
        /**
         * Listen to key events to be able to drag and set the correct canvas client width
        */
        componentDidMount(): void;
        /**
         * Makes sure the canvas has resposition correctly
         * @param prevProps previous props
         */
        componentDidUpdate(prevProps: ISvgDraggableAreaProps): void;
        /**
         * Identify the type of target of the mouse event
         * @param e SVG Mouse Event
         */
        dragStart: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        /**
         * Handle dragging
         * @param e SVG Mouse Event
         */
        drag: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        /**
         *  Resets the dragging state
         * @param e Drag event
         */
        dragEnd: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        /**
         * Gets the current position of the mouse in a SVG Canvas
         * @param e Mouse event
         */
        getMousePosition: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => BABYLON.Vector2 | undefined;
        /**
         * Handles the canvas panning direction and sets the X and Y values to move the
         * SVG canvas
         */
        panDirection(): void;
        /**
         * Allows dragging
         * @param e Keyboard event
         */
        keyDown(e: KeyboardEvent): void;
        /**
         * Allows multiple selection
         * @param e Keyboard event
         */
        keyUp(e: KeyboardEvent): void;
        /**
         * Focus on the SVG canvas
         * @param e Mouse event
         */
        focus: (e: React.MouseEvent<SVGSVGElement>) => void;
        /**
         * Is the control point active or not
         */
        isNotControlPointActive(): boolean;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export interface IIconButtonLineComponentProps {
        icon: string;
        onClick: () => void;
        tooltip: string;
        active?: boolean;
    }
    export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
        constructor(props: IIconButtonLineComponentProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IControlsProps {
        keyframes: BABYLON.IAnimationKey[] | null;
        selected: BABYLON.IAnimationKey | null;
        currentFrame: number;
        onCurrentFrameChange: (frame: number) => void;
        repositionCanvas: (keyframe: BABYLON.IAnimationKey) => void;
        playPause: (direction: number) => void;
        isPlaying: boolean;
        scrollable: React.RefObject<HTMLDivElement>;
    }
    /**
     * The playback controls for the animation editor
     */
    export class Controls extends React.Component<IControlsProps, {
        selected: BABYLON.IAnimationKey;
        playingType: string;
    }> {
        readonly _sizeOfKeyframe: number;
        constructor(props: IControlsProps);
        playBackwards: () => void;
        play: () => void;
        pause: () => void;
        /**
         * Set animation to initial keyframe
         */
        moveToAnimationStart: () => void;
        /**
         * Set animation to the last keyframe
         */
        moveToAnimationEnd: () => void;
        /** Move to next keyframe */
        nextKeyframe: () => void;
        /** Move to previous keyframe */
        previousKeyframe: () => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ITimelineProps {
        keyframes: BABYLON.IAnimationKey[] | null;
        selected: BABYLON.IAnimationKey | null;
        currentFrame: number;
        onCurrentFrameChange: (frame: number) => void;
        onAnimationLimitChange: (limit: number) => void;
        dragKeyframe: (frame: number, index: number) => void;
        playPause: (direction: number) => void;
        isPlaying: boolean;
        animationLimit: number;
        fps: number;
        repositionCanvas: (keyframe: BABYLON.IAnimationKey) => void;
        resizeWindowProportion: number;
    }
    interface ITimelineState {
        selected: BABYLON.IAnimationKey;
        activeKeyframe: number | null;
        start: number;
        end: number;
        scrollWidth: number | undefined;
        selectionLength: number[];
        limitValue: number;
    }
    /**
     * The Timeline for the curve editor
     *
     * Has a scrollbar that can be resized and move to left and right.
     * The timeline does not affect the Canvas but only the frame container.
     */
    export class Timeline extends React.Component<ITimelineProps, ITimelineState> {
        private _scrollable;
        private _scrollbarHandle;
        private _scrollContainer;
        private _inputAnimationLimit;
        private _direction;
        private _scrolling;
        private _shiftX;
        private _active;
        readonly _marginScrollbar: number;
        constructor(props: ITimelineProps);
        /** Listen to keyup events and set the initial lenght of the scrollbar */
        componentDidMount(): void;
        /** Recalculate the scrollwidth if a window resize happens */
        componentDidUpdate(prevProps: ITimelineProps): void;
        /** Remove key event listener */
        componentWillUnmount(): void;
        /**
         * Set component state if enter key is pressed
         * @param event enter key event
         */
        isEnterKeyUp(event: KeyboardEvent): void;
        /**
         * Detect blur event
         * @param event Blur event
         */
        onInputBlur(event: React.FocusEvent<HTMLInputElement>): void;
        /** Set component state (scrollbar width, position, and start and end) */
        setControlState(): void;
        /**
         * Set scrollwidth on the timeline
         * @param {number} start Frame from which the scrollbar should begin.
         * @param {number} end Last frame for the timeline.
         */
        calculateScrollWidth(start: number, end: number): number | undefined;
        /**
         * Play animation backwards
         * @param event Mouse event
         */
        playBackwards(event: React.MouseEvent<HTMLDivElement>): void;
        /**
         * Play animation
         * @param event Mouse event
         */
        play(event: React.MouseEvent<HTMLDivElement>): void;
        /**
         * Pause the animation
         * @param event Mouse event
         */
        pause(event: React.MouseEvent<HTMLDivElement>): void;
        /**
         * Set the selected frame
         * @param event Mouse event
         */
        setCurrentFrame: (event: React.MouseEvent<HTMLDivElement>) => void;
        /**
         * Handles the change of number of frames available in the timeline.
         */
        handleLimitChange(event: React.ChangeEvent<HTMLInputElement>): void;
        /**
         * Starts the scrollbar dragging
         * @param e Mouse event on SVG Element
         */
        dragStart: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        /**
         * Update the canvas visible frames while dragging
         * @param e Mouse event
         */
        drag: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        /**
         * Check if the frame is being used as a Keyframe by the animation
         * @param frame number of frame
         * @param direction frame increment or decrement
         */
        isFrameBeingUsed(frame: number, direction: number): number | false;
        /**
         * Reset drag state
         * @param e Mouse event on SVG Element
         */
        dragEnd: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
        /**
         * Change position of the scrollbar
         * @param e Mouse event
         */
        scrollDragStart: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
        /**
         * Change size of scrollbar
         * @param e Mouse event
         */
        scrollDrag: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
        /**
         * Reset scroll drag
         * @param e Mouse event
         */
        scrollDragEnd: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
        /**
         * Sets the start, end and selection length of the scrollbar. This will control the width and
         * height of the scrollbar as well as the number of frames available
         * @param {number} pageX Controls the X axis of the scrollbar movement.
         */
        moveScrollbar(pageX: number): void;
        /**
         * Controls the resizing of the scrollbar from the right handle
         * @param {number} clientX how much mouse has moved
         */
        resizeScrollbarRight(clientX: number): void;
        /**
         * Controls the resizing of the scrollbar from the left handle
         *  @param {number} clientX how much mouse has moved
         */
        resizeScrollbarLeft(clientX: number): void;
        /**
         * Returns array with the expected length between two numbers
         * @param start initial visible frame
         * @param stop last visible frame
         */
        range(start: number, end: number): number[];
        /**
         * Get the animation keyframe
         * @param frame Frame
         */
        getKeyframe(frame: number): false | BABYLON.IAnimationKey | undefined;
        /**
         * Get the current animation keyframe
         * @param frame Frame
         */
        getCurrentFrame(frame: number): boolean;
        dragDomFalse: () => boolean;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPlayheadProps {
        message: string;
        open: boolean;
        close: () => void;
    }
    /**
     * Renders the notification for the user
     */
    export class Notification extends React.Component<IPlayheadProps> {
        constructor(props: IPlayheadProps);
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IGraphActionsBarProps {
        addKeyframe: () => void;
        removeKeyframe: () => void;
        frameSelectedKeyframes: () => void;
        handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleFrameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        flatTangent: () => void;
        brokeTangents: () => void;
        setLerpToActiveControlPoint: () => void;
        brokenMode: boolean;
        lerpMode: boolean;
        actionableKeyframe: IActionableKeyFrame;
        title: string;
        enabled: boolean;
        setKeyframeValue: (actionableKeyframe: IActionableKeyFrame) => void;
        frameRange: {
            min: number | undefined;
            max: number | undefined;
        };
    }
    /**
     * Has the buttons and actions for the Canvas Graph.
     * Handles input change and actions (flat, broken mode, set linear control points)
     */
    export class GraphActionsBar extends React.Component<IGraphActionsBarProps, {
        frame: string;
        value: string;
        min: number | undefined;
        max: number | undefined;
    }> {
        private _frameInput;
        private _valueInput;
        constructor(props: IGraphActionsBarProps);
        /**
         * Listen to keyup changes to handle if the input event has ended or change
         */
        componentDidMount(): void;
        /**
         * Set the changing state of frame, value and range of the actionablekeyframe
         * @param prevProps previous props
         * @param prevState previous state
         */
        componentDidUpdate(prevProps: IGraphActionsBarProps, prevState: any): void;
        /**
         * Returns the frame and value for the keyframe
         * @param keyframe The keyframe to update
         */
        selectedKeyframeChanged(keyframe: IActionableKeyFrame): {
            frame: string;
            value: string;
        };
        /**
         * Remove listeners
         */
        componentWillUnmount(): void;
        /**
         * Trigger the change on the keyframe
         * @param event Enter keyevent
         */
        isEnterKeyUp(event: KeyboardEvent): void;
        /**
         * Trigger the chnage on the keyframe on blur
         * @param event Focus event
         */
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
        /**
         * Gets the keyframe frame
         */
        getFrame(): string | number;
        /**
         * Gets the keyframe value
         */
        getValue(): string | number;
        /**
         * Set keyframe value state
         * @param e Input event
         */
        handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        /**
         * Set the keyframe frame state
         * @param e Input event
         */
        handleFrameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IAnimationListTreeProps {
        isTargetedAnimation: boolean;
        entity: BABYLON.IAnimatable | BABYLON.TargetedAnimation;
        selected: BABYLON.Animation | null;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        selectAnimation: (selected: BABYLON.Animation, coordinate?: SelectedCoordinate) => void;
        empty: () => void;
        editAnimation: (selected: BABYLON.Animation) => void;
        deselectAnimation: () => void;
    }
    interface Item {
        index: number;
        name: string;
        property: string;
        selected: boolean;
        open: boolean;
    }
    export enum SelectedCoordinate {
        x = 0,
        y = 1,
        z = 2,
        w = 3,
        r = 0,
        g = 1,
        b = 2,
        a = 3,
        width = 0,
        height = 1
    }
    interface ItemCoordinate {
        id: string;
        color: string;
        coordinate: SelectedCoordinate;
    }
    /**
     * Renders a list of current animations.
     */
    export class AnimationListTree extends React.Component<IAnimationListTreeProps, {
        selectedCoordinate: SelectedCoordinate;
        selectedAnimation: number;
        animationList: Item[] | null;
        animations: BABYLON.Nullable<BABYLON.Animation[]> | BABYLON.Animation;
    }> {
        constructor(props: IAnimationListTreeProps);
        /**
         * Set the animation list if has changed properties
         * @param prevProps previous properties
         */
        componentDidUpdate(prevProps: IAnimationListTreeProps): void;
        /**
         * Delete animation from list
         */
        deleteAnimation: () => void;
        /**
         * Update the animations collection
         * @param newValue new animation list
         * @param previousValue previous animation list
         */
        raiseOnPropertyChanged(newValue: BABYLON.Animation[], previousValue: BABYLON.Animation[]): void;
        /**
         * Renders the animation list
         */
        generateList(): Item[] | null;
        /**
         * Open or closes the animation to show its coordinate animations
         * @param index BABYLON.Animation index
         */
        toggleProperty(index: number): void;
        /**
         * Select the animation to render
         * @param animation Selected animation
         * @param coordinate Selected coordinate (x, y, z)
         * @param index Index
         */
        setSelectedCoordinate(animation: BABYLON.Animation, coordinate: SelectedCoordinate, index: number): void;
        /**
         * Renders the coordinate belonging to an animation
         * @param i Index
         * @param animation Selected animation
         * @param coordinate Coordinate name
         * @param color Color identifier
         * @param selectedCoordinate Selected coordinate (x, y, z)
         */
        coordinateItem(i: number, animation: BABYLON.Animation, coordinate: string, color: string, selectedCoordinate: SelectedCoordinate): JSX.Element;
        /**
         * Render animation
         * @param animation selected animations
         * @param i index
         * @param childrenElements its coordinate (x,y,z) animations
         */
        typeAnimationItem(animation: BABYLON.Animation, i: number, childrenElements: ItemCoordinate[]): JSX.Element;
        /**
         * Render animation item
         * @param animation Selected aniamtion
         * @param i index
         */
        setListItem(animation: BABYLON.Animation, i: number): JSX.Element | null;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ILoadSnippetProps {
        animations: BABYLON.Animation[];
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        lockObject: LockObject;
        globalState: GlobalState;
        snippetServer: string;
        setSnippetId: (id: string) => void;
        entity: BABYLON.IAnimatable | BABYLON.TargetedAnimation;
        setNotificationMessage: (message: string) => void;
        animationsLoaded: (numberOfAnimations: number) => void;
    }
    /**
     * Loads animation locally or from the Babylon.js Snippet Server
     */
    export class LoadSnippet extends React.Component<ILoadSnippetProps, {
        snippetId: string;
    }> {
        private _serverAddress;
        constructor(props: ILoadSnippetProps);
        /**
         * Set the animations snippet id
         * @param value Snippet ID
         */
        change: (value: string) => void;
        /**
         * Select a local file to load animations
         * @param file File name
         */
        loadFromFile: (file: File) => void;
        /**
         * Load animations from server identified with a snippet id
         */
        loadFromSnippet: () => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISaveSnippetProps {
        animations: BABYLON.Nullable<BABYLON.Animation[]>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        lockObject: LockObject;
        globalState: GlobalState;
        snippetServer: string;
        snippetId: string;
    }
    export interface Snippet {
        url: string;
        id: string;
    }
    interface SelectedAnimation {
        id: string;
        name: string;
        index: number;
        selected: boolean;
    }
    /**
     * Saves the animation snippet to the Babylon.js site or downloads the animation file locally
     */
    export class SaveSnippet extends React.Component<ISaveSnippetProps, {
        selectedAnimations: SelectedAnimation[];
    }> {
        constructor(props: ISaveSnippetProps);
        /**
         * Set the selected animations to save
         * @param e Input event
         */
        handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        /**
         * Stringify the selected animation
         */
        stringifySelectedAnimations(): string;
        /**
         * Save the selected animations to a local file
         */
        saveToFile: () => void;
        /**
         * Save the selected animations if a snippet ID is set
         */
        saveToSnippet: () => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IEditorControlsProps {
        isTargetedAnimation: boolean;
        entity: BABYLON.IAnimatable | BABYLON.TargetedAnimation;
        selected: BABYLON.Animation | null;
        lockObject: LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        setNotificationMessage: (message: string) => void;
        selectAnimation: (selected: BABYLON.Animation, axis?: SelectedCoordinate) => void;
        setFps: (fps: number) => void;
        setIsLooping: () => void;
        globalState: GlobalState;
        snippetServer: string;
        deselectAnimation: () => void;
        fps: number;
    }
    interface IEditorControlsState {
        isAnimationTabOpen: boolean;
        isEditTabOpen: boolean;
        isLoadTabOpen: boolean;
        isSaveTabOpen: boolean;
        isLoopActive: boolean;
        animationsCount: number;
        framesPerSecond: number;
        snippetId: string;
        selected: BABYLON.Animation | undefined;
    }
    /**
     * Renders the Curve Editor controls to create, save, remove, load and edit animations
     */
    export class EditorControls extends React.Component<IEditorControlsProps, IEditorControlsState> {
        constructor(props: IEditorControlsProps);
        /**
         * Makes sure the frames per second receive the updated prop
         * @param prevProps previous properties
         */
        componentDidUpdate(prevProps: IEditorControlsProps): void;
        /**
         * Add the nimation, recounts the list and opens the correct tab
         * @param animation The recently empty created animation
         */
        onAnimationAdded: (animation: BABYLON.Animation) => void;
        /**
         * Set state when the animations list has finished updated
         */
        finishedUpdate: () => void;
        recountAnimations(): number;
        /**
         * Toggles loop
         */
        changeLoopBehavior: () => void;
        /**
         * This avoids using lambda functions in JSX
         */
        handleFirstTab: () => void;
        handleSecondTab: () => void;
        handleThirdTab: () => void;
        handleFourthTab: () => void;
        handleTabs(tab: number): void;
        handleChangeFps: (fps: number) => void;
        /**
         * Cleans the list when has been emptied
         */
        onEmptiedList: () => void;
        /**
         * When animations have been reloaded update tabs
         */
        animationsLoaded: (numberOfAnimations: number) => void;
        /**
         * The currently selected animation to edit it
         * @param selected Selected animation
         */
        editAnimation: (selected: BABYLON.Animation) => void;
        setSnippetId: (id: string) => void;
        /**
         * Marks animation tab closed and hides the tab
         */
        onCloseAddAnimation: () => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface ISwitchButtonProps {
        /** Current scale */
        current: CurveScale;
        /** On click change of scale */
        action?: (event: CurveScale) => void;
    }
    /**
     * Displays the current scale
     */
    export class ScaleLabel extends React.Component<ISwitchButtonProps, {
        current: CurveScale;
    }> {
        constructor(props: ISwitchButtonProps);
        renderLabel(scale: CurveScale): "" | "DEG" | "FLT" | "INT" | "RAD";
        onClickHandle: () => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IAnimationCurveEditorComponentProps {
        playOrPause?: () => void;
        scene: BABYLON.Scene;
        entity: BABYLON.IAnimatable | BABYLON.TargetedAnimation;
        lockObject: LockObject;
        globalState: GlobalState;
    }
    /**
     * Represent an Axis of the canvas. This help us control the frame/panning
     */
    interface ICanvasAxis {
        value: number;
        label: number;
    }
    /**
     * This help us identify the type of scaling on the selected animated property
     */
    export enum CurveScale {
        float = 0,
        radians = 1,
        degrees = 2,
        integers = 3,
        default = 4
    }
    /**
     * This represents the visible selected keyframe in the canvas. If the keyframe is selected
     * we should be able to edit the frame and value.
     */
    export interface IActionableKeyFrame {
        frame?: number | string;
        value?: any;
    }
    /**
     * Each curve is an SVG Path. This Interface give us its properties to render on the canvas.
     */
    interface ICurveData {
        pathData: string;
        pathLength: number;
        domCurve: React.RefObject<SVGPathElement>;
        color: string;
        id: string;
    }
    /**
     * The curve editor state
     */
    interface IAnimationCurveEditorComponentState {
        /** If the editor is opened or closed */
        isOpen: boolean;
        /** The currently selected animation from which the curves will render */
        selected: BABYLON.Animation | null;
        /** A list of keyframes to be rendered as SVG Elements in the curve */
        svgKeyframes: IKeyframeSvgPoint[] | undefined;
        /** The current frame in which the playhead is positioned */
        currentFrame: number;
        /** The current value in which the playhead is positioned */
        currentValue: number;
        /** The number of frame in which the current canvas is divided. The helps to render the frames in the graph editor */
        frameAxisLength: ICanvasAxis[];
        /** The number of values in which the current canvas is divided. The helps to render the frames in the graph editor. The current scale decides how these values are rendered*/
        valueAxisLength: ICanvasAxis[];
        /** If the selected keyframe should be treated as a flat tangent curve */
        isFlatTangentMode: boolean;
        /** If the tangent mode is active */
        isTangentMode: boolean;
        /** If the control points are broken or not */
        isBrokenMode: boolean;
        /** If selected keyframe should render its selected control point to be linear or not */
        lerpMode: boolean;
        /** The scale of the canvas */
        scale: number;
        /** The offset of the playhead to position itself on the canvas */
        playheadOffset: number;
        /** The error or warning message to display */
        notification: string;
        /** The current selected point in the SVG curve */
        currentPoint: SVGPoint | undefined;
        /** The start position of the playhead */
        playheadPos: number;
        /** If the animation is playing or not */
        isPlaying: boolean;
        /** The selected curve represented with an array of curves */
        selectedPathData: ICurveData[] | undefined;
        /** The currently selected coordinate of a complex property (i.e. x, y, z) */
        selectedCoordinate: number;
        /** The number of frames available in the canvas timeline*/
        animationLimit: number;
        /** The currently animation frames per second */
        fps: number;
        /** If the animation is set to loop or not while animation is playing */
        isLooping: boolean;
        /** The amount of vertical panning the user has moved the canvas */
        panningY: number;
        /** The amount of horizontal panning the user has moved the canvas */
        panningX: number;
        /** If the canvas has finished repositioned itself */
        repositionCanvas: boolean;
        /** The current selected keyframe on which we can perform actions (update frame and value) */
        actionableKeyframe: IActionableKeyFrame;
        /** The current value scale */
        valueScaleType: CurveScale;
        /** The amount scale to update valyes */
        valueScale: number;
        /** The canvas proportion width */
        canvasLength: number;
        /** The last frame to be created. */
        lastKeyframeCreated: BABYLON.Nullable<string>;
        /** The canvas scale width */
        canvasWidthScale: number;
        /** How the resize of the canvas will change the value axis */
        valuesPositionResize: number;
        /** How many frames are currently visible in the canvas */
        framesInCanvasView: {
            from: number;
            to: number;
        };
        /** Limits the maximum frame from which a keyframe can move in the curve. So it wont overlap the curve*/
        maxFrame: number | undefined;
        /** Limits the minimum frame from which a keyframe can move in the curve. So it wont overlap the curve*/
        minFrame: number | undefined;
        /** How many frames have been increased or reduced on a windows resize event */
        framesResized: number;
    }
    /**
     * BABYLON.Animation curve Editor Component
     * This component allows the use to create animations visualy from the Babylon.js playground.
     * The principal features for the curve editor are:
     * 1. Create animations for the selected entity properties.
     * 2. Edit the animations a selected entity has.
     * 3. You can load and save animations locally and from the snippet server.
     * 4. After creating an animation you need to add keyframes.
     * 5. You can update the frame and value of each frame.
     * @property {() => void} playOrPause is the event to stop or inititate the animation on the playground scene
     * @property {Scene} scene is the scene object from the playground
     * @property {IAnimatable | BABYLON.TargetedAnimation} entity represents the selected entity which will be the animations target
     * @property {LockObject} lockObject the inherited object to lock for modification with the BABYLON.Observable pattern
     * @property {GlobalState} globalState the playground globalstate
     * Check the IAnimationCurveEditorComponentState for state functionality
     */
    export class AnimationCurveEditorComponent extends React.Component<IAnimationCurveEditorComponentProps, IAnimationCurveEditorComponentState> {
        readonly _entityName: string;
        private _snippetUrl;
        private _heightScale;
        private _scaleFactor;
        private _currentScale;
        private _pixelFrameUnit;
        private _svgKeyframes;
        private _isPlaying;
        private _graphCanvas;
        private _editor;
        private _editorWindow;
        private _resizeId;
        private _svgCanvas;
        private _isTargetedAnimation;
        private _resizedTimeline;
        private _onBeforeRenderObserver;
        private _mainAnimatable;
        constructor(props: IAnimationCurveEditorComponentProps);
        componentDidMount(): void;
        /**
         * Connects scene frame with curve editor animation
         * @param prevProps previous Props
         * @param prevState previous State
         */
        componentDidUpdate(prevProps: IAnimationCurveEditorComponentProps, prevState: any): void;
        /**
         * Clean up observer and listeners
         */
        componentWillUnmount(): void;
        /**
         * Set the frame on the animation
         * @param value number of frame to move animation
         */
        onCurrentFrameChangeScene(value: number): void;
        /**
         * Notifications
         * To add notification we set the state and clear to make the notification bar hide.
         */
        clearNotification: () => void;
        /**
         * Zoom and Scroll
         * This section handles zoom and scroll
         * of the graph area.
         */
        zoom: (e: React.WheelEvent<HTMLDivElement>) => void;
        /**
         * Returns Array with labels and values for Frame axis in Canvas
         */
        setFrameAxis(currentLength: number): {
            value: number;
            label: number;
        }[];
        /**
         * Returns Array with labels, lines and values for Value axis in Canvas
         */
        setValueLines(): {
            value: number;
            label: string;
        }[];
        /**
         * Creates a string id from animation name and the keyframe index
         * @param animationName Name of animation
         * @param keyframeIndex Index of keyframe
         */
        encodeCurveId(animationName: string, keyframeIndex: number): string;
        /**
         * Returns the animation keyframe index and the animation selected coordinate (x, y, z)
         * @param id curve id created with index and coordinate of animation
         */
        decodeCurveId(id: string): {
            order: number;
            coordinate: number;
        };
        /**
         * Returns the value from a keyframe
         * @param id curve id
         */
        getKeyframeValueFromAnimation(id: string): {
            frame: number;
            value: number;
        } | undefined;
        /**
         * Keyframe Manipulation
         * This section handles events from SvgDraggableArea.
         * @param id selected keyframe id
         * @param multiselect if we are multiselecting keyframes
         */
        selectKeyframe: (id: string, multiselect: boolean) => void;
        /**
         * Determine if two control points are collinear (flat tangent)
         * @param kf keyframe point
         */
        hasCollinearPoints: (kf: IKeyframeSvgPoint | undefined) => boolean;
        /**
         * Returns the previous and next keyframe from a selected frame.
         * @param frame index of keyframe
         */
        getPreviousAndNextKeyframe: (frame: number) => {
            prev: number | undefined;
            next: number | undefined;
        };
        /**
         * Selects a keyframe in animation based on its Id
         * @param id keyframe id
         * @param actionableKeyframe selected keyframe
         */
        selectKeyframeFromId: (id: string, actionableKeyframe: IActionableKeyFrame) => void;
        /**
         * Resets the current selected keyframe as an updatable pairs by Graph BABYLON.GUI.Control Bar
         */
        resetActionableKeyframe: () => void;
        /**
         * Sets the selected control point.
         * @param type left or right control point
         * @param id id of selected svg keyframe
         */
        selectedControlPoint: (type: string, id: string) => void;
        /**
         * Sets the selected control point.
         */
        deselectKeyframes: () => void;
        /**
         * Update the BABYLON.Animation Key values based on its type
         * @param dataType Type of animated property
         * @param newValue New value of animated property
         * @param coordinate The selected property coordinate to animate (i.e. x, y, z)
         */
        updateValuePerCoordinate(dataType: number, value: number | BABYLON.Vector2 | BABYLON.Vector3 | BABYLON.Color3 | BABYLON.Color4 | BABYLON.Size | BABYLON.Quaternion, newValue: number, coordinate?: number): number | BABYLON.Vector3 | BABYLON.Quaternion | BABYLON.Color3 | BABYLON.Color4 | BABYLON.Vector2 | BABYLON.Size;
        /**
         * BABYLON.Animation should always have a keyframe at Frame Zero
         * @param keys BABYLON.Animation key collection
         */
        forceFrameZeroToExist(keys: BABYLON.IAnimationKey[]): void;
        /**
         * Renders SVG points with dragging of the curve
         * @param updatedSvgKeyFrame selected keyframe to update
         * @param id curve id where the keyframe is localted
         */
        renderPoints: (updatedSvgKeyFrame: IKeyframeSvgPoint, id: string) => void;
        /**
         * Updates the left control point on render points
         * @param updatedSvgKeyFrame selected svg keyframe
         * @param key animation key to update
         * @param dataType type of animation
         * @param coordinate coordinate to change its value (x, y, or z)
         */
        updateLeftControlPoint(updatedSvgKeyFrame: IKeyframeSvgPoint, key: BABYLON.IAnimationKey, dataType: number, coordinate: number): void;
        /**
         * Updates the right control point on render points
         * @param updatedSvgKeyFrame selected svg keyframe
         * @param key animation key to update
         * @param dataType type of animation
         * @param coordinate coordinate to change its value (x, y, or z)
         */
        updateRightControlPoint(updatedSvgKeyFrame: IKeyframeSvgPoint, key: BABYLON.IAnimationKey, dataType: number, coordinate: number): void;
        /**
         * Get the current BABYLON.GUI.Control Point weight (how far the X value is multiplied)
         * @param updatedSvgKeyFrame svg keyframe from which to calculate the distance to control point
         */
        getControlPointWeight(updatedSvgKeyFrame: IKeyframeSvgPoint): number;
        /**
         * Handles a Frame selection change
         * @event event input event to change frame value
         */
        handleFrameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        /**
         * Handles how a value change on a selected frame
         * @event event input event to change the value of the keyframe
         */
        handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        /**
         * Set the Keyframe from input control in Graph BABYLON.GUI.Control Bar
         * @param actionableKeyframe selected keyframe
         */
        setKeyframeValueFromInput: (actionableKeyframe: IActionableKeyFrame) => void;
        /**
         * Sets the SVG Keyframe value
         * Finds the selected svg keyframe and passes the correct value to the correct animated keyframe.
         */
        setKeyframeValue: () => void;
        /**
         * Set the flat tangent to the current selected control points.
         * get the selected control point and updates its tangent to flat the tangent
         */
        setFlatTangent: () => void;
        /**
         * Sets Broken mode of lines
         * Broken mode enables control points not to be connected on drag
         */
        setBrokenMode: () => void;
        /**
         * Sets a control point to be a linear interpolation with its Keyframe
         * If left or right control point is selected, sets the Tangent value to match the next keyframe and become linear
         */
        setLerpToActiveControlPoint: () => void;
        /**
         * Adds a new keyframe to the curve on canvas click
         */
        addKeyframeClick: () => void;
        /**
         * Remove keyframe on click
         */
        removeKeyframeClick: () => void;
        /**
         * Remove the selected keyframes
         * @param points the selected keyframes to remove
         */
        removeKeyframes: (points: IKeyframeSvgPoint[]) => void;
        /**
         * Adds a keyframe
         * @event event Mouse click event to generate new keyframe
         */
        addKeyFrame(event: React.MouseEvent<SVGSVGElement>): void;
        /**
         * Curve Rendering Functions
         * This section handles how to render curves.
         * @param point point in canvas
         * @param index index of svg
         */
        setKeyframePointLinear(point: BABYLON.Vector2, index: number): void;
        /**
         * Flats the tangents of the selected keyframes
         * @param keyframes Selected keyframes to flat its tangents
         * @param dataType Type of animated property
         */
        flatTangents(keyframes: BABYLON.IAnimationKey[], dataType: number): BABYLON.IAnimationKey[];
        /**
         * Return a Keyframe zero value depending on Type
         * @param dataType Type of animated property
         */
        returnZero(dataType: number): 0 | BABYLON.Vector3 | BABYLON.Quaternion | BABYLON.Color3 | BABYLON.Color4 | BABYLON.Vector2 | BABYLON.Size;
        /**
         * Return the keyframe value as an array depending on type
         * @param valueType type of animated property
         * @param value the value of the property
         */
        getValueAsArray(valueType: number, value: number | BABYLON.Vector2 | BABYLON.Vector3 | BABYLON.Color3 | BABYLON.Color4 | BABYLON.Size | BABYLON.Quaternion): number[];
        /**
         * Sets the keyframe value as an array depending on type
         * @param valueType type of animated property
         * @param arrayValue array to place the correct value
         */
        setValueAsType(valueType: number, arrayValue: number[]): number | BABYLON.Vector3 | BABYLON.Quaternion | BABYLON.Color3 | BABYLON.Color4 | BABYLON.Vector2 | BABYLON.Size;
        /**
         * Returns the SVG Path Data to render the curve
         * @param animation The animation object from where to get its keyframes
         */
        getPathData(animation: BABYLON.Animation | null): ICurveData[] | undefined;
        /**
         * Gets the selected animation properties
         * @param animation BABYLON.Animation
         */
        getAnimationData(animation: BABYLON.Animation): {
            loopMode: number | undefined;
            name: string;
            blendingSpeed: number;
            targetPropertyPath: string[];
            targetProperty: string;
            framesPerSecond: number;
            highestFrame: number;
            usesTangents: boolean;
            easingType: string | undefined;
            easingMode: number | undefined;
            valueType: number;
        };
        /**
         * Calculate the correct tangents to be linear
         * @param keyframes the animation keyframes
         */
        calculateLinearTangents(keyframes: BABYLON.IAnimationKey[]): BABYLON.IAnimationKey[];
        /**
         * Calculates the proper linear tangents if there is no tangents defined
         * Before calculation of svg path we need to calculate the proper tangents
         * @param keyframes the animation keyframes
         * @param data initial svg path
         * @param middle the middle of the canvas to draw the curve
         * @param type type of animation
         * @param coordinate (x, y, z) value
         * @param animationName The animation name to generate the curve id
         */
        curvePathWithoutTangents(keyframes: BABYLON.IAnimationKey[], data: string, middle: number, type: number, coordinate: number, animationName: string): string;
        /**
         * Calculates the curve data and control points for animation
         * @param keyframes the animation keyframes
         * @param data initial svg path
         * @param middle the middle of the canvas to draw the curve
         * @param type type of animation
         * @param coordinate (x, y, z) value
         * @param animationName The animation name to generate the curve id
         */
        curvePathWithTangents(keyframes: BABYLON.IAnimationKey[], data: string, middle: number, type: number, coordinate: number, animationName: string): string;
        /**
         * Calculates a curve path from predefined easing function
         * @param keyframes animation keyframes
         * @param data the initial svg path
         * @param middle the center of the canvas
         * @param easingFunction the easing function to calculate the curve from (easing function should generate the correct curve)
         */
        curvePath(keyframes: BABYLON.IAnimationKey[], data: string, middle: number, easingFunction: BABYLON.EasingFunction): string;
        /**
         * Sets the proper SVG Keyframe points
         * @param controlPoints array of points to generate the svg keyframe collection
         * @param index index of the animation
         * @param keyframesCount How many keyframes should we process
         */
        setKeyframePoint(controlPoints: BABYLON.Vector2[], index: number, keyframesCount: number): void;
        /**
         * Creates curve based on interpolated points
         * @param p0 starting point of curve
         * @param p1 first control point
         * @param u distance between p0 and p3 as percentage to affect p1
         * @param p2 second control point
         * @param v distance between p0 and p3 as percentage to affect p2
         * @param p3 finish point of curve
         */
        interpolateControlPoints(p0: BABYLON.Vector2, p1: BABYLON.Vector2, u: number, p2: BABYLON.Vector2, v: number, p3: BABYLON.Vector2): BABYLON.Vector2[] | undefined;
        /**
         * Deselects the current animations
         */
        deselectAnimation: () => void;
        /**
         * Remove all curves from canvas
         */
        cleanCanvas: () => void;
        /**
         * Selects the animation and renders the curve
         * @param animation the animation to select and render as curve
         * @param coordinate the property coordinate (x, y, z) to represent as curve
         */
        selectAnimation: (animation: BABYLON.Animation, coordinate?: SelectedCoordinate | undefined) => void;
        /**
         * Set the state for the last selected keyframe
         */
        postSelectionEvents: () => void;
        /**
         * Set main animatable to play or pause the animation
         */
        setMainAnimatable(): void;
        /**
         * Check if animation is playing
         */
        isAnimationPlaying(): boolean;
        /**
         * Stops the current playing animation
         */
        stopAnimation(): void;
        /**
         * Set if animation is looping and stops animation after it
         */
        setIsLooping: () => void;
        setFramesPerSecond: (fps: number) => void;
        /**
         * Check if the animation has easing predefined
         */
        analyzeAnimationForLerp(animation: BABYLON.Animation | null): boolean;
        /**
         * Change the current frame in the canvas and timeline
         * @param frame value to update on canvas and timeline
         */
        changeCurrentFrame: (frame: number) => void;
        /**
         * Calculate the value of the selected frame in curve
         * @param frame the frame to calculate its current value on the curve
         */
        calculateCurrentPointInCurve: (frame: number) => number | undefined;
        /**
         * Center the position the canvas depending on Keyframe value and frame
         * @param keyframe the keyframe to set as middle point
         */
        setCanvasPosition: (keyframe: BABYLON.IAnimationKey) => void;
        /**
         * Sets the current frame
         * @param frame the value to set the frame
         */
        setCurrentFrame: (frame: number) => void;
        /**
         * Change the timeline animation frame limit
         */
        changeAnimationLimit: (limit: number) => void;
        /**
         * Update the frame in the selected Keyframe
         */
        updateFrameInKeyFrame: (frame: number, index: number) => void;
        /**
         * Plays or pauses the animation
         * @param direction 0 stops the animation, 1 starts the animation, -1 plays animation backwards
         */
        playPause: (direction: number) => void;
        /**
         * Set the frame to selected position on canvas
         * @event e click event on the SVG canvas
         */
        moveFrameTo(e: React.MouseEvent<SVGRectElement, MouseEvent>): void;
        /**
         * Register the observables for the state
         */
        registerObs(): void;
        /**
         * Checks if the current frame macthes the parameter
         * @param frame The frame to check
         */
        isCurrentFrame(frame: number): boolean;
        /**
         * Set the Vertical Panning State
         * @param panningY the vertical panning value
         */
        setPanningY: (panningY: number) => void;
        /**
         * Set the Vertical Panning State
         * @param panningX the horizontal panning value
         */
        setPanningX: (panningX: number) => void;
        /**
         * Set state when canvas has been respositioned
         */
        canvasPositionEnded: () => void;
        /**
         *
         * @param message The message to display in the notification bar
         */
        setNotificationMessage: (message: string) => void;
        /**
         * Zoom or frame the selected keyframes in the available canvas space
         */
        frameSelectedKeyframes: () => void;
        /**
         * Handle the frames quantity and scale on Window resize width
         */
        onWindowResizeWidth: () => void;
        /**
         * Set the state of frames Resized on window resize event
         * @param framesResized how many frame have been added or removed on resize
         */
        onWindowEndResize: (framesResized: number) => void;
        /** Resizes the width of the timeline */
        onTimelineResize: () => void;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    interface IPlayheadProps {
        frame: number;
        offset: number;
        onCurrentFrameChange: (frame: number) => void;
    }
    /**
     * Renders the Playhead
     */
    export class Playhead extends React.Component<IPlayheadProps> {
        private _direction;
        private _active;
        constructor(props: IPlayheadProps);
        dragStart(e: React.TouchEvent<HTMLDivElement>): void;
        dragStart(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
        drag(e: React.TouchEvent<HTMLDivElement>): void;
        drag(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
        dragEnd(e: React.TouchEvent<HTMLDivElement>): void;
        dragEnd(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
        calculateMove(): string;
        render(): JSX.Element;
    }
}
declare module INSPECTOR {
    export const Contrast: IToolData;
}