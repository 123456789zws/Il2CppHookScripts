import { PackList } from "../../../../../../../../../bridge/fix/packer/packList"
import { UnityEngine_EventSystems_PointerEventData_Impl as PointerEventData } from "../../../../../../AbstractEventData/BaseEventData/PointerEventData/class"
import { UnityEngine_Events_UnityAction_Impl as UnityAction } from "../../../../../../Delegate/MulticastDelegate/UnityAction/class"
import { UnityEngine_UI_Button_ButtonClickedEvent_Impl as ButtonClickedEvent } from "../../../../../../UnityEventBase/UnityEvent/ButtonClickedEvent/class"
import { GameObjectImpl as GameObject } from "../../../../../GameObject/class"
import { ButtonImpl as Button } from "./class"

function OnPointerClick() {
    let funcAddr: NativePointer | undefined = undefined
    switch (arguments[0]) {
        default:
            funcAddr = Il2Cpp.Api.Button._OnPointerClick
            if (funcAddr == undefined || funcAddr.isNull()) break
            LOGE("\nEnable Hook OnPointerClick at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(Il2Cpp.Api.Button._OnPointerClick, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("public void OnPointerClick( " + args[0] + " , " + args[1] + " )")
                FakePointerEventData(args[1])
            })
            break
        case 0:
            funcAddr = find_method("UnityEngine.UI", "PointerInputModule", "DeselectIfSelectionChanged", 2)
            if (funcAddr.isNull()) break
            LOGE("\nEnable Hook DeselectIfSelectionChanged at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected void DeselectIfSelectionChanged(Ins = " + args[0] + " , GameObject = " + args[1] + " , BaseEventData(" + findClass("BaseEventData") + ") = " + args[2] + " )")
                if (!args[1].isNull()) showGameObject(args[1])
            })
            break
        case 1:
            funcAddr = find_method("UnityEngine.UI", "ScrollRect", "OnInitializePotentialDrag", 1)
            if (funcAddr.isNull()) break
            LOGE("\nEnable Hook OnInitializePotentialDrag at " + funcAddr + "(" + funcAddr.sub(soAddr) + ")" + "\n")
            A(funcAddr, (args) => {
                LOGW("\n" + getLine(38))
                LOGD("public void OnInitializePotentialDrag( " + args[0] + " , " + args[1] + " )")
                FakePointerEventData(args[1])
            })
            break
        case 2:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessMove", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessMove( " + (args[1]) + " )")
                FakePointerEventData(args[1])
            })
            break
        case 3:
            A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessDrag", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void ProcessDrag( " + (args[1]) + " )")
                FakePointerEventData(args[1])
            })
            break
        case 4:
            A(find_method("UnityEngine.UI", "BaseInputModule", "HandlePointerExitAndEnter", 2), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void HandlePointerExitAndEnter( " + (args[1]) + " , " + (args[2]) + ")")
                FakePointerEventData(args[1])
            })
            break
        case 5:
            A(find_method("UnityEngine.UI", "PointerEventData", "set_pointerPress", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void set_pointerPress( " + (args[1]) + " )")
                showGameObject(args[1])
            })
            break
        case 6:
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetPointerData", 3), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void GetPointerData( " + (args[2]) + " )")
                showGameObject(args[1])
                showEventData(args[2])
            })
            break
        case 7:
            // EventSystem --->  public Void RaycastAll (PointerEventData eventData,List`1 raycastResults)
            A(find_method("UnityEngine.UI", "EventSystem", "RaycastAll", 2), (args) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void RaycastAll( ${args[0]} , ${args[1]} , ${args[2]} )`)
                FakePointerEventData(args[1])
            })
            break
        case 8:
            // PointerInputModule --->  protected PointerEventData GetTouchPointerEventData (Touch input,Boolean pressed,Boolean released)
            A(find_method("UnityEngine.UI", "PointerInputModule", "GetTouchPointerEventData", 3), (args) => { }, (ret) => {
                LOGW("\n" + getLine(38))
                LOGD(`protected virtual Void GetTouchPointerEventData `)
                FakePointerEventData(ret)
            })
        case 9:
            // Selectable --->  public virtual Void OnPointerExit (PointerEventData eventData)
            A(find_method("UnityEngine.UI", "Selectable", "OnPointerExit", 1), (args) => {
                LOGW("\n" + getLine(38))
                LOGD("protected virtual Void OnPointerExit( " + (args[1]) + " )")
                FakePointerEventData(args[1])
            })
            break
    }

    function FakePointerEventData(eventData: NativePointer): void {
        if (eventData.isNull()) return
        let gameObj: Il2Cpp.GameObject = new PointerEventData(eventData).get_pointerEnter()
        if (!gameObj.handle.isNull()) showGameObject(gameObj.handle)
        // showTransform(f_getTransform(gameObj))
        // showEventData(pointerEventData)
    }
}

const OnButtonClick = () => {
    // OnPointerClick(instance, PointerEventData) : Void
    A(Il2Cpp.Api.Button._OnPointerClick, (args) => {
        let currentGameobj: GameObject = getGameObjectPack(args[0])
        let button: Button = new Button(args[0])
        let pointerEventData: PointerEventData = new PointerEventData(args[1])
        let buttonOnclickEvent: ButtonClickedEvent = button.get_onClick()
        LOGD(`\n[*] ${pointerEventData.handle} ---> ${currentGameobj.get_name()} { G:${currentGameobj.handle} | T:${currentGameobj.get_transform().handle} }`)

        // m_ExecutingCalls : List<BaseInvokableCall>
        let exeCalls: PackList = buttonOnclickEvent.m_Calls.m_ExecutingCalls
        let persistentCalls: PackList = buttonOnclickEvent.m_Calls.m_PersistentCalls
        let runtimeCalls: PackList = buttonOnclickEvent.m_Calls.m_RuntimeCalls
        let callsArray: Array<PackList> = [exeCalls, persistentCalls, runtimeCalls]

        setTimeout(() => {
            callsArray.forEach((callList: PackList) => {
                LOGZ(`\t[+] ${callList}`)
                callList.forEach((instance: Il2Cpp.Object, index: number) => {
                    // // UnityEngine.Events.InvokableCall
                    // LOGD(index + " : " + instance + " " + instance.handle)
                    let action = (instance.field('Delegate').value as Il2Cpp.Object)
                    // lfp(action.handle)
                    let unityAction = new UnityAction(action.handle)
                    let method: Il2Cpp.Method
                    if (!unityAction.method.isNull()) {
                        method = new Il2Cpp.Method(unityAction.method)
                    } else if (!unityAction.method_ptr.isNull()) {
                        method = AddressToMethod(unityAction.method_ptr, false)
                    } else throw new Error("unityAction.method is null")
                    LOGW(`\t\t[${index}] ${method.class.image.assembly.name}.${method.class.name}.${method.name} @ ${method.relativeVirtualAddress} <- ${method.virtualAddress} }`)
                })
            })
        }, 20);
    })
}

/**
 * 隐藏模拟点击位置的gameobj
 * 这里find_method()在移植的时候写具体的地址就是，不用移植整个js代码
 * @param {*} x 
 * @param {*} y 
 */
const HideClickedObj = (x: number, y: number) => {
    let m_ptr = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1)
    let srcFunc = new NativeFunction(m_ptr, 'void', ['pointer', 'pointer', 'pointer', 'pointer'])
    Interceptor.revert(m_ptr)
    Interceptor.replace(m_ptr, new NativeCallback(function (arg0, pointerEventData, arg2, arg3) {
        srcFunc(arg0, pointerEventData, arg2, arg3)
        if (pointerEventData.isNull()) return
        let gameObj = new PointerEventData(pointerEventData).get_pointerEnter()
        // 判断名字后使用这三种方式都可以去掉该对象
        if (gameObj.get_name() === "Settings Button") {
            // setActive(gameObj,0)
            // var m_transform = new NativeFunction(find_method("UnityEngine.CoreModule","GameObject","get_transform",0),'pointer',['pointer'])(gameObj)
            // SetLocalScale(m_transform,0,0,0)
            // destroyObj(gameObj)
        }
    }, 'void', ['pointer', 'pointer', 'pointer', 'pointer']))

    setClick(x, y)
    // B 去断点找到点击事件的处理函数并nop掉
    // 循环调用，出现时destory掉这个gameObj
}

export { OnPointerClick, OnButtonClick, HideClickedObj }

declare global {
    var HookOnPointerClick: () => void
    var B_Button: () => void
    var HideClickedObj: (x: number, y: number) => void
}

globalThis.HookOnPointerClick = OnPointerClick
globalThis.B_Button = OnButtonClick
globalThis.HideClickedObj = HideClickedObj
