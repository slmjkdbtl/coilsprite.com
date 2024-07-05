export type Key =
	| "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f11" | "f12"
	| "`" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "-" | "="
	| "q" | "w" | "e" | "r" | "t" | "y" | "u" | "i" | "o" | "p" | "[" | "]" | "\\"
	| "a" | "s" | "d" | "f" | "g" | "h" | "j" | "k" | "l" | ";" | "'"
	| "z" | "x" | "c" | "v" | "b" | "n" | "m" | "," | "." | "/"
	| "escape" | "backspace" | "enter" | "tab" | "control" | "alt" | "meta" | "space" | " "
	| "left" | "right" | "up" | "down" | "shift"

type Func = (...args: any[]) => any

export function overload2<A extends Func, B extends Func>(fn1: A, fn2: B): A & B {
	return ((...args) => {
		const al = args.length
		if (al === fn1.length) return fn1(...args)
		if (al === fn2.length) return fn2(...args)
	}) as A & B
}

export type Cursor =
	string
	| "auto"
	| "default"
	| "none"
	| "context-menu"
	| "help"
	| "pointer"
	| "progress"
	| "wait"
	| "cell"
	| "crosshair"
	| "text"
	| "vertical-text"
	| "alias"
	| "copy"
	| "move"
	| "no-drop"
	| "not-allowed"
	| "grab"
	| "grabbing"
	| "all-scroll"
	| "col-resize"
	| "row-resize"
	| "n-resize"
	| "e-resize"
	| "s-resize"
	| "w-resize"
	| "ne-resize"
	| "nw-resize"
	| "se-resize"
	| "sw-resize"
	| "ew-resize"
	| "ns-resize"
	| "nesw-resize"
	| "nwse-resize"
	| "zoom-int"
	| "zoom-out"

export type KGamePad = {
	/** The order of the gamepad in the gamepad list. */
	index: number;
	/** If certain button is pressed. */
	isPressed(b: GamepadButton): boolean,
	/** If certain button is held down. */
	isDown(b: GamepadButton): boolean,
	/** If certain button is released. */
	isReleased(b: GamepadButton): boolean,
	/** Get the value of a stick. */
	getStick(stick: GamepadStick): Vec2,
}

export type MouseButton =
	| "left"
	| "right"
	| "middle"
	| "back"
	| "forward"

export type GamepadDef = {
	buttons: Record<string, GamepadButton>,
	sticks: Partial<Record<GamepadStick, { x: number, y: number }>>,
}

export type GamepadButton =
	| "north"
	| "east"
	| "south"
	| "west"
	| "ltrigger"
	| "rtrigger"
	| "lshoulder"
	| "rshoulder"
	| "select"
	| "start"
	| "lstick"
	| "rstick"
	| "dpad-up"
	| "dpad-right"
	| "dpad-down"
	| "dpad-left"
	| "home"
	| "capture"

const GAMEPAD_MAP: Record<string, GamepadDef> = {
	"Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
		"buttons": {
			"0": "south",
			"1": "east",
			"2": "west",
			"3": "north",
			"4": "lshoulder",
			"5": "rshoulder",
			"6": "ltrigger",
			"7": "rtrigger",
			"8": "select",
			"9": "start",
			"10": "lstick",
			"11": "rstick",
			"12": "dpad-up",
			"13": "dpad-down",
			"14": "dpad-left",
			"15": "dpad-right",
			"16": "home",
			"17": "capture"
		},
		"sticks": {
			"left": { "x": 0, "y": 1 },
			"right": { "x": 2, "y": 3 }
		}
	},
	"Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
		"buttons": {
			"0": "south",
			"1": "east",
			"2": "west",
			"3": "north",
			"4": "lshoulder",
			"5": "rshoulder",
			"9": "select",
			"10": "lstick",
			"16": "start"
		},
		"sticks": {
			"left": { "x": 0, "y": 1 }
		}
	},
	"Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
		"buttons": {
			"0": "south",
			"1": "east",
			"2": "west",
			"3": "north",
			"4": "lshoulder",
			"5": "rshoulder",
			"9": "start",
			"10": "lstick",
			"16": "select"
		},
		"sticks": {
			"left": { "x": 0, "y": 1 }
		}
	},
	"Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
		"buttons": {
			"0": "south",
			"1": "east",
			"2": "west",
			"3": "north",
			"4": "lshoulder",
			"5": "rshoulder",
			"6": "ltrigger",
			"7": "rtrigger",
			"8": "select",
			"9": "start",
			"10": "lstick",
			"11": "rstick",
			"12": "dpad-up",
			"13": "dpad-down",
			"14": "dpad-left",
			"15": "dpad-right",
			"16": "home",
			"17": "capture"
		},
		"sticks": {
			"left": { "x": 0, "y": 1 },
			"right": { "x": 2, "y": 3 }
		}
	},
	"default": {
		"buttons": {
			"0": "south",
			"1": "east",
			"2": "west",
			"3": "north",
			"4": "lshoulder",
			"5": "rshoulder",
			"6": "ltrigger",
			"7": "rtrigger",
			"8": "select",
			"9": "start",
			"10": "lstick",
			"11": "rstick",
			"12": "dpad-up",
			"13": "dpad-down",
			"14": "dpad-left",
			"15": "dpad-right",
			"16": "home"
		},
		"sticks": {
			"left": { "x": 0, "y": 1 },
			"right": { "x": 2, "y": 3 }
		}
	}
}

export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t
}

export function deg2rad(deg: number): number {
	return deg * Math.PI / 180
}

export function rad2deg(rad: number): number {
	return rad * 180 / Math.PI
}

export class Mat4 {

	m: number[] = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
	]

	constructor(m?: number[]) {
		if (m) {
			this.m = m
		}
	}

	static translate(p: Vec2): Mat4 {
		return new Mat4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			p.x, p.y, 0, 1,
		])
	}

	static scale(s: Vec2): Mat4 {
		return new Mat4([
			s.x, 0, 0, 0,
			0, s.y, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		])
	}

	static rotateX(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		return new Mat4([
			1, 0, 0, 0,
			0, c, -s, 0,
			0, s, c, 0,
			0, 0, 0, 1,
		])
	}

	static rotateY(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		return new Mat4([
			c, 0, s, 0,
			0, 1, 0, 0,
			-s, 0, c, 0,
			0, 0, 0, 1,
		])
	}

	static rotateZ(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		return new Mat4([
			c, -s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		])
	}

	translate(p: Vec2) {
		this.m[12] += this.m[0] * p.x + this.m[4] * p.y
		this.m[13] += this.m[1] * p.x + this.m[5] * p.y
		this.m[14] += this.m[2] * p.x + this.m[6] * p.y
		this.m[15] += this.m[3] * p.x + this.m[7] * p.y
		return this
	}

	scale(p: Vec2) {
		this.m[0] *= p.x
		this.m[4] *= p.y
		this.m[1] *= p.x
		this.m[5] *= p.y
		this.m[2] *= p.x
		this.m[6] *= p.y
		this.m[3] *= p.x
		this.m[7] *= p.y
		return this
	}

	rotate(a: number): Mat4 {
		a = deg2rad(-a)
		const c = Math.cos(a)
		const s = Math.sin(a)
		const m0 = this.m[0]
		const m1 = this.m[1]
		const m4 = this.m[4]
		const m5 = this.m[5]
		this.m[0] = m0 * c + m1 * s
		this.m[1] = -m0 * s + m1 * c
		this.m[4] = m4 * c + m5 * s
		this.m[5] = -m4 * s + m5 * c
		return this
	}

	// TODO: in-place variant
	mult(other: Mat4): Mat4 {
		const out = []
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				out[i * 4 + j] =
					this.m[0 * 4 + j] * other.m[i * 4 + 0] +
					this.m[1 * 4 + j] * other.m[i * 4 + 1] +
					this.m[2 * 4 + j] * other.m[i * 4 + 2] +
					this.m[3 * 4 + j] * other.m[i * 4 + 3]
			}
		}
		return new Mat4(out)
	}

	multVec2(p: Vec2): Vec2 {
		return new Vec2(
			p.x * this.m[0] + p.y * this.m[4] + this.m[12],
			p.x * this.m[1] + p.y * this.m[5] + this.m[13],
		)
	}

	getTranslation() {
		return new Vec2(this.m[12], this.m[13])
	}

	getScale() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			const det = this.m[0] * this.m[5] - this.m[1] * this.m[4]
			const r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1])
			return new Vec2(r, det / r)
		} else if (this.m[4] != 0 || this.m[5] != 0) {
			const det = this.m[0] * this.m[5] - this.m[1] * this.m[4]
			const s = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5])
			return new Vec2(det / s, s)
		} else {
			return new Vec2(0, 0)
		}
	}

	getRotation() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			const r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1])
			return rad2deg(this.m[1] > 0 ? Math.acos(this.m[0] / r) : -Math.acos(this.m[0] / r))
		} else if (this.m[4] != 0 || this.m[5] != 0) {
			const s = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5])
			return rad2deg(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / s) : -Math.acos(this.m[4] / s)))
		} else {
			return 0
		}
	}

	getSkew() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			const r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1])
			return new Vec2(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (r * r), 0)
		}
		else if (this.m[4] != 0 || this.m[5] != 0) {
			const s = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5])
			return new Vec2(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (s * s))
		}
		else {
			return new Vec2(0, 0)
		}
	}

	invert(): Mat4 {

		const out = []

		const f00 = this.m[10] * this.m[15] - this.m[14] * this.m[11]
		const f01 = this.m[9] * this.m[15] - this.m[13] * this.m[11]
		const f02 = this.m[9] * this.m[14] - this.m[13] * this.m[10]
		const f03 = this.m[8] * this.m[15] - this.m[12] * this.m[11]
		const f04 = this.m[8] * this.m[14] - this.m[12] * this.m[10]
		const f05 = this.m[8] * this.m[13] - this.m[12] * this.m[9]
		const f06 = this.m[6] * this.m[15] - this.m[14] * this.m[7]
		const f07 = this.m[5] * this.m[15] - this.m[13] * this.m[7]
		const f08 = this.m[5] * this.m[14] - this.m[13] * this.m[6]
		const f09 = this.m[4] * this.m[15] - this.m[12] * this.m[7]
		const f10 = this.m[4] * this.m[14] - this.m[12] * this.m[6]
		const f11 = this.m[5] * this.m[15] - this.m[13] * this.m[7]
		const f12 = this.m[4] * this.m[13] - this.m[12] * this.m[5]
		const f13 = this.m[6] * this.m[11] - this.m[10] * this.m[7]
		const f14 = this.m[5] * this.m[11] - this.m[9] * this.m[7]
		const f15 = this.m[5] * this.m[10] - this.m[9] * this.m[6]
		const f16 = this.m[4] * this.m[11] - this.m[8] * this.m[7]
		const f17 = this.m[4] * this.m[10] - this.m[8] * this.m[6]
		const f18 = this.m[4] * this.m[9] - this.m[8] * this.m[5]

		out[0] = this.m[5] * f00 - this.m[6] * f01 + this.m[7] * f02
		out[4] = -(this.m[4] * f00 - this.m[6] * f03 + this.m[7] * f04)
		out[8] = this.m[4] * f01 - this.m[5] * f03 + this.m[7] * f05
		out[12] = -(this.m[4] * f02 - this.m[5] * f04 + this.m[6] * f05)

		out[1] = -(this.m[1] * f00 - this.m[2] * f01 + this.m[3] * f02)
		out[5] = this.m[0] * f00 - this.m[2] * f03 + this.m[3] * f04
		out[9] = -(this.m[0] * f01 - this.m[1] * f03 + this.m[3] * f05)
		out[13] = this.m[0] * f02 - this.m[1] * f04 + this.m[2] * f05

		out[2] = this.m[1] * f06 - this.m[2] * f07 + this.m[3] * f08
		out[6] = -(this.m[0] * f06 - this.m[2] * f09 + this.m[3] * f10)
		out[10] = this.m[0] * f11 - this.m[1] * f09 + this.m[3] * f12
		out[14] = -(this.m[0] * f08 - this.m[1] * f10 + this.m[2] * f12)

		out[3] = -(this.m[1] * f13 - this.m[2] * f14 + this.m[3] * f15)
		out[7] = this.m[0] * f13 - this.m[2] * f16 + this.m[3] * f17
		out[11] = -(this.m[0] * f14 - this.m[1] * f16 + this.m[3] * f18)
		out[15] = this.m[0] * f15 - this.m[1] * f17 + this.m[2] * f18

		const det =
			this.m[0] * out[0] +
			this.m[1] * out[4] +
			this.m[2] * out[8] +
			this.m[3] * out[12]

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				out[i * 4 + j] *= (1.0 / det)
			}
		}

		return new Mat4(out)

	}

	clone(): Mat4 {
		return new Mat4([...this.m])
	}

	toString(): string {
		return this.m.toString()
	}

}

export type Vec2Args = [number, number] | [number] | [Vec2] | [number | Vec2] | []

export function vec2(...args: Vec2Args): Vec2 {
	if (args.length === 1) {
		if (args[0] instanceof Vec2) {
			return new Vec2(args[0].x, args[0].y)
		} else if (Array.isArray(args[0]) && args[0].length === 2) {
			return new Vec2(...args[0])
		}
	}
	// @ts-ignore
	return new Vec2(...args)
}

export class Vec2 {
	x: number = 0
	y: number = 0
	constructor(x: number = 0, y: number = x) {
		this.x = x
		this.y = y
	}
	static fromAngle(deg: number) {
		const angle = deg2rad(deg)
		return new Vec2(Math.cos(angle), Math.sin(angle))
	}
	static LEFT = new Vec2(-1, 0)
	static RIGHT = new Vec2(1, 0)
	static UP = new Vec2(0, -1)
	static DOWN = new Vec2(0, 1)
	clone(): Vec2 {
		return new Vec2(this.x, this.y)
	}
	add(...args: Vec2Args): Vec2 {
		const p2 = vec2(...args)
		return new Vec2(this.x + p2.x, this.y + p2.y)
	}
	sub(...args: Vec2Args): Vec2 {
		const p2 = vec2(...args)
		return new Vec2(this.x - p2.x, this.y - p2.y)
	}
	scale(...args: Vec2Args): Vec2 {
		const s = vec2(...args)
		return new Vec2(this.x * s.x, this.y * s.y)
	}
	dist(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return this.sub(p2).len()
	}
	sdist(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return this.sub(p2).slen()
	}
	len(): number {
		return Math.sqrt(this.dot(this))
	}
	slen(): number {
		return this.dot(this)
	}
	unit(): Vec2 {
		const len = this.len()
		return len === 0 ? new Vec2(0) : this.scale(1 / len)
	}
	normal(): Vec2 {
		return new Vec2(this.y, -this.x)
	}
	reflect(normal: Vec2) {
		return this.sub(normal.scale(2 * this.dot(normal)))
	}
	project(on: Vec2) {
		return on.scale(on.dot(this) / on.len())
	}
	reject(on: Vec2) {
		return this.sub(this.project(on))
	}
	dot(p2: Vec2): number {
		return this.x * p2.x + this.y * p2.y
	}
	cross(p2: Vec2): number {
		return this.x * p2.y - this.y * p2.x
	}
	angle(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return rad2deg(Math.atan2(this.y - p2.y, this.x - p2.x))
	}
	angleBetween(...args: Vec2Args): number {
		const p2 = vec2(...args)
		return rad2deg(Math.atan2(this.cross(p2), this.dot(p2)))
	}
	lerp(dest: Vec2, t: number): Vec2 {
		return new Vec2(lerp(this.x, dest.x, t), lerp(this.y, dest.y, t))
	}
	slerp(dest: Vec2, t: number): Vec2 {
		const cos = this.dot(dest)
		const sin = this.cross(dest)
		const angle = Math.atan2(sin, cos)
		return this
			.scale(Math.sin((1 - t) * angle))
			.add(dest.scale(Math.sin(t * angle)))
			.scale(1 / sin)
	}
	isZero(): boolean {
		return this.x === 0 && this.y === 0
	}
	toFixed(n: number): Vec2 {
		return new Vec2(Number(this.x.toFixed(n)), Number(this.y.toFixed(n)))
	}
	transform(m: Mat4): Vec2 {
		return m.multVec2(this)
	}
	eq(other: Vec2): boolean {
		return this.x === other.x && this.y === other.y
	}
	toString(): string {
		return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`
	}
}

export class ButtonState<T = string> {
	pressed: Set<T> = new Set([])
	pressedRepeat: Set<T> = new Set([])
	released: Set<T> = new Set([])
	down: Set<T> = new Set([])
	update() {
		this.pressed.clear()
		this.released.clear()
		this.pressedRepeat.clear()
	}
	press(btn: T) {
		this.pressed.add(btn)
		this.pressedRepeat.add(btn)
		this.down.add(btn)
	}
	pressRepeat(btn: T) {
		this.pressedRepeat.add(btn)
	}
	release(btn: T) {
		this.down.delete(btn)
		this.pressed.delete(btn)
		this.released.add(btn)
	}
}

export type GamepadStick = "left" | "right"

class GamepadState {
	buttonState: ButtonState<GamepadButton> = new ButtonState()
	stickState: Map<GamepadStick, Vec2> = new Map()
}

export class Registry<T> extends Map<number, T> {
	private lastID: number = 0
	push(v: T): number {
		const id = this.lastID
		this.set(id, v)
		this.lastID++
		return id
	}
	pushd(v: T): () => void {
		const id = this.push(v)
		return () => this.delete(id)
	}
}

export class EventController {
	paused: boolean = false
	readonly cancel: () => void
	constructor(cancel: () => void) {
		this.cancel = cancel
	}
	static join(events: EventController[]): EventController {
		const ev = new EventController(() => events.forEach((e) => e.cancel()))
		Object.defineProperty(ev, "paused", {
			get: () => events[0].paused,
			set: (p: boolean) => events.forEach((e) => e.paused = p),
		})
		ev.paused = false
		return ev
	}
}

export class Event<Args extends any[] = any[]> {
	private handlers: Registry<(...args: Args) => void> = new Registry()
	add(action: (...args: Args) => void): EventController {
		const cancel = this.handlers.pushd((...args: Args) => {
			if (ev.paused) return
			action(...args)
		})
		const ev = new EventController(cancel)
		return ev
	}
	addOnce(action: (...args: Args) => void): EventController {
		const ev = this.add((...args) => {
			ev.cancel()
			action(...args)
		})
		return ev
	}
	next(): Promise<Args> {
		return new Promise((res) => this.addOnce(res))
	}
	trigger(...args: Args) {
		this.handlers.forEach((action) => action(...args))
	}
	numListeners(): number {
		return this.handlers.size
	}
	clear() {
		this.handlers.clear()
	}
}

export class EventHandler<EventMap extends Record<string, any[]>> {
	private handlers: Partial<{
		[Name in keyof EventMap]: Event<EventMap[Name]>
	}> = {}
	on<Name extends keyof EventMap>(
		name: Name,
		action: (...args: EventMap[Name]) => void,
	): EventController {
		if (!this.handlers[name]) {
			this.handlers[name] = new Event<EventMap[Name]>()
		}
		return this.handlers[name].add(action)
	}
	onOnce<Name extends keyof EventMap>(
		name: Name,
		action: (...args: EventMap[Name]) => void,
	): EventController {
		const ev = this.on(name, (...args) => {
			ev.cancel()
			action(...args)
		})
		return ev
	}
	next<Name extends keyof EventMap>(name: Name): Promise<unknown> {
		return new Promise((res) => {
			// TODO: can only pass 1 val to resolve()
			this.onOnce(name, (...args: EventMap[Name]) => res(args[0]))
		})
	}
	trigger<Name extends keyof EventMap>(name: Name, ...args: EventMap[Name]) {
		if (this.handlers[name]) {
			this.handlers[name].trigger(...args)
		}
	}
	remove<Name extends keyof EventMap>(name: Name) {
		delete this.handlers[name]
	}
	clear() {
		this.handlers = {}
	}
	numListeners<Name extends keyof EventMap>(name: Name): number {
		return this.handlers[name]?.numListeners() ?? 0
	}
}

export function deepEq(o1: any, o2: any): boolean {
	if (o1 === o2) {
		return true
	}
	const t1 = typeof o1
	const t2 = typeof o2
	if (t1 !== t2) {
		return false
	}
	if (t1 === "object" && t2 === "object" && o1 !== null && o2 !== null) {
		if (Array.isArray(o1) !== Array.isArray(o2)) {
			return false
		}
		const k1 = Object.keys(o1)
		const k2 = Object.keys(o2)
		if (k1.length !== k2.length) {
			return false
		}
		for (const k of k1) {
			const v1 = o1[k]
			const v2 = o2[k]
			if (!deepEq(v1, v2)) {
				return false
			}
		}
		return true
	}
	return false
}

class FPSCounter {
	private dts: number[] = []
	private timer: number = 0
	fps: number = 0
	tick(dt: number) {
		this.dts.push(dt)
		this.timer += dt
		if (this.timer >= 1) {
			this.timer = 0
			this.fps = Math.round(1 / (this.dts.reduce((a, b) => a + b) / this.dts.length))
			this.dts = []
		}
	}
}

export default (opt: {
	canvas: HTMLCanvasElement,
	touchToMouse?: boolean,
	gamepads?: Record<string, GamepadDef>,
	pixelDensity?: number,
	maxFPS?: number,
}) => {

	if (!opt.canvas) {
		throw new Error("Please provide a canvas")
	}

	const state = {
		canvas: opt.canvas,
		loopID: null as null | number,
		stopped: false,
		dt: 0,
		time: 0,
		realTime: 0,
		fpsCounter: new FPSCounter(),
		timeScale: 1,
		skipTime: false,
		isHidden: false,
		numFrames: 0,
		mousePos: new Vec2(0),
		mouseDeltaPos: new Vec2(0),
		keyState: new ButtonState<Key>(),
		mouseState: new ButtonState<MouseButton>(),
		mergedGamepadState: new GamepadState(),
		gamepadStates: new Map<number, GamepadState>(),
		gamepads: [] as KGamePad[],
		charInputted: [],
		isMouseMoved: false,
		lastWidth: opt.canvas.offsetWidth,
		lastHeight: opt.canvas.offsetHeight,
		events: new EventHandler<{
			mouseMove: [],
			mouseDown: [MouseButton],
			mousePress: [MouseButton],
			mouseRelease: [MouseButton],
			charInput: [string],
			keyPress: [Key],
			keyDown: [Key],
			keyPressRepeat: [Key],
			keyRelease: [Key],
			touchStart: [Vec2, Touch],
			touchMove: [Vec2, Touch],
			touchEnd: [Vec2, Touch],
			gamepadButtonDown: [string],
			gamepadButtonPress: [string],
			gamepadButtonRelease: [string],
			gamepadStick: [string, Vec2],
			gamepadConnect: [KGamePad],
			gamepadDisconnect: [KGamePad],
			scroll: [Vec2],
			hide: [],
			show: [],
			resize: [],
			input: [],
		}>(),
	}

	function dt() {
		return state.dt * state.timeScale
	}

	function isHidden() {
		return state.isHidden
	}

	function time() {
		return state.time
	}

	function fps() {
		return state.fpsCounter.fps
	}

	function numFrames() {
		return state.numFrames
	}

	function screenshot(): string {
		return state.canvas.toDataURL()
	}

	function setCursor(c: Cursor): void {
		state.canvas.style.cursor = c
	}

	function getCursor(): Cursor {
		return state.canvas.style.cursor
	}

	function setCursorLocked(b: boolean): void {
		if (b) {
			try {
				const res = state.canvas.requestPointerLock() as unknown as Promise<void>
				if (res.catch) {
					res.catch((e) => console.error(e))
				}
			} catch (e) {
				console.error(e)
			}
		} else {
			document.exitPointerLock()
		}
	}

	function isCursorLocked(): boolean {
		return !!document.pointerLockElement
	}

	// wrappers around full screen functions to work across browsers
	function enterFullscreen(el: HTMLElement) {
		if (el.requestFullscreen) el.requestFullscreen()
		// @ts-ignore
		else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
	}

	function exitFullscreen() {
		if (document.exitFullscreen) document.exitFullscreen()
		// @ts-ignore
		else if (document.webkitExitFullScreen) document.webkitExitFullScreen()
	}

	function getFullscreenElement(): Element | void {
		return document.fullscreenElement
			// @ts-ignore
			|| document.webkitFullscreenElement
	}

	function setFullscreen(f: boolean = true) {
		if (f) {
			enterFullscreen(state.canvas)
		} else {
			exitFullscreen()
		}
	}

	function isFullscreen(): boolean {
		return Boolean(getFullscreenElement())
	}

	function quit() {
		state.stopped = true
		for (const name in canvasEvents) {
			state.canvas.removeEventListener(name, canvasEvents[name])
		}
		for (const name in docEvents) {
			document.removeEventListener(name, docEvents[name])
		}
		for (const name in winEvents) {
			window.removeEventListener(name, winEvents[name])
		}
		resizeObserver.disconnect()
	}

	function run(action: () => void) {

		if (state.loopID !== null) {
			cancelAnimationFrame(state.loopID)
		}

		let accumulatedDt = 0

		const frame = (t: number) => {

			if (state.stopped) return

			// TODO: allow background actions?
			if (document.visibilityState !== "visible") {
				state.loopID = requestAnimationFrame(frame)
				return
			}

			const loopTime = t / 1000
			const realDt = loopTime - state.realTime
			const desiredDt = opt.maxFPS ? 1 / opt.maxFPS : 0

			state.realTime = loopTime
			accumulatedDt += realDt

			if (accumulatedDt > desiredDt) {
				if (!state.skipTime) {
					state.dt = accumulatedDt
					state.time += dt()
					state.fpsCounter.tick(state.dt)
				}
				accumulatedDt = 0
				state.skipTime = false
				state.numFrames++
				processInput()
				action()
				resetInput()
			}

			state.loopID = requestAnimationFrame(frame)

		}

		frame(0)

	}

	function isTouchscreen() {
		return ("ontouchstart" in window) || navigator.maxTouchPoints > 0
	}

	function mousePos(): Vec2 {
		return state.mousePos.clone()
	}

	function mouseDeltaPos(): Vec2 {
		return state.mouseDeltaPos.clone()
	}

	function isMousePressed(m: MouseButton = "left"): boolean {
		return state.mouseState.pressed.has(m)
	}

	function isMouseDown(m: MouseButton = "left"): boolean {
		return state.mouseState.down.has(m)
	}

	function isMouseReleased(m: MouseButton = "left"): boolean {
		return state.mouseState.released.has(m)
	}

	function isMouseMoved(): boolean {
		return state.isMouseMoved
	}

	function isKeyPressed(k?: Key): boolean {
		return k === undefined
			? state.keyState.pressed.size > 0
			: state.keyState.pressed.has(k)
	}

	function isKeyPressedRepeat(k?: Key): boolean {
		return k === undefined
			? state.keyState.pressedRepeat.size > 0
			: state.keyState.pressedRepeat.has(k)
	}

	function isKeyDown(k?: Key): boolean {
		return k === undefined
			? state.keyState.down.size > 0
			: state.keyState.down.has(k)
	}

	function isKeyReleased(k?: Key): boolean {
		return k === undefined
			? state.keyState.released.size > 0
			: state.keyState.released.has(k)
	}

	function isGamepadButtonPressed(btn?: GamepadButton): boolean {
		return btn === undefined
			? state.mergedGamepadState.buttonState.pressed.size > 0
			: state.mergedGamepadState.buttonState.pressed.has(btn)
	}

	function isGamepadButtonDown(btn?: GamepadButton): boolean {
		return btn === undefined
			? state.mergedGamepadState.buttonState.down.size > 0
			: state.mergedGamepadState.buttonState.down.has(btn)
	}

	function isGamepadButtonReleased(btn?: GamepadButton): boolean {
		return btn === undefined
			? state.mergedGamepadState.buttonState.released.size > 0
			: state.mergedGamepadState.buttonState.released.has(btn)
	}

	function onResize(action: () => void): EventController {
		return state.events.on("resize", action)
	}

	// input callbacks
	const onKeyDown = overload2((action: (key: Key) => void) => {
		return state.events.on("keyDown", action)
	}, (key: Key, action: (key: Key) => void) => {
		return state.events.on("keyDown", (k) => k === key && action(key))
	})

	const onKeyPress = overload2((action: (key: Key) => void) => {
		return state.events.on("keyPress", action)
	}, (key: Key, action: (key: Key) => void) => {
		return state.events.on("keyPress", (k) => k === key && action(key))
	})

	const onKeyPressRepeat = overload2((action: (key: Key) => void) => {
		return state.events.on("keyPressRepeat", action)
	}, (key: Key, action: (key: Key) => void) => {
		return state.events.on("keyPressRepeat", (k) => k === key && action(key))
	})

	const onKeyRelease = overload2((action: (key: Key) => void) => {
		return state.events.on("keyRelease", action)
	}, (key: Key, action: (key: Key) => void) => {
		return state.events.on("keyRelease", (k) => k === key && action(key))
	})

	const onMouseDown = overload2((action: (m: MouseButton) => void) => {
		return state.events.on("mouseDown", (m) => action(m))
	}, (mouse: MouseButton, action: (m: MouseButton) => void) => {
		return state.events.on("mouseDown", (m) => m === mouse && action(m))
	})

	const onMousePress = overload2((action: (m: MouseButton) => void) => {
		return state.events.on("mousePress", (m) => action(m))
	}, (mouse: MouseButton, action: (m: MouseButton) => void) => {
		return state.events.on("mousePress", (m) => m === mouse && action(m))
	})

	const onMouseRelease = overload2((action: (m: MouseButton) => void) => {
		return state.events.on("mouseRelease", (m) => action(m))
	}, (mouse: MouseButton, action: (m: MouseButton) => void) => {
		return state.events.on("mouseRelease", (m) => m === mouse && action(m))
	})

	function onMouseMove(f: (pos: Vec2, dpos: Vec2) => void): EventController {
		return state.events.on("mouseMove", () => f(mousePos(), mouseDeltaPos()))
	}

	function onCharInput(action: (ch: string) => void): EventController {
		return state.events.on("charInput", action)
	}

	function onTouchStart(f: (pos: Vec2, t: Touch) => void): EventController {
		return state.events.on("touchStart", f)
	}

	function onTouchMove(f: (pos: Vec2, t: Touch) => void): EventController {
		return state.events.on("touchMove", f)
	}

	function onTouchEnd(f: (pos: Vec2, t: Touch) => void): EventController {
		return state.events.on("touchEnd", f)
	}

	function onScroll(action: (delta: Vec2) => void): EventController {
		return state.events.on("scroll", action)
	}

	function onHide(action: () => void): EventController {
		return state.events.on("hide", action)
	}

	function onShow(action: () => void): EventController {
		return state.events.on("show", action)
	}

	function onGamepadButtonDown(btn: GamepadButton | ((btn: GamepadButton) => void), action?: (btn: GamepadButton) => void): EventController {
		if (typeof btn === "function") {
			return state.events.on("gamepadButtonDown", btn)
		} else if (typeof btn === "string" && typeof action === "function") {
			return state.events.on("gamepadButtonDown", (b) => b === btn && action(btn))
		}
	}

	function onGamepadButtonPress(btn: GamepadButton | ((btn: GamepadButton) => void), action?: (btn: GamepadButton) => void): EventController {
		if (typeof btn === "function") {
			return state.events.on("gamepadButtonPress", btn)
		} else if (typeof btn === "string" && typeof action === "function") {
			return state.events.on("gamepadButtonPress", (b) => b === btn && action(btn))
		}
	}

	function onGamepadButtonRelease(btn: GamepadButton | ((btn: GamepadButton) => void), action?: (btn: GamepadButton) => void): EventController {
		if (typeof btn === "function") {
			return state.events.on("gamepadButtonRelease", btn)
		} else if (typeof btn === "string" && typeof action === "function") {
			return state.events.on("gamepadButtonRelease", (b) => b === btn && action(btn))
		}
	}

	function onGamepadStick(stick: GamepadStick, action: (value: Vec2) => void): EventController {
		return state.events.on("gamepadStick", ((a: string, v: Vec2) => a === stick && action(v)))
	}

	function onGamepadConnect(action: (gamepad: KGamePad) => void) {
		state.events.on("gamepadConnect", action)
	}

	function onGamepadDisconnect(action: (gamepad: KGamePad) => void) {
		state.events.on("gamepadDisconnect", action)
	}

	function getGamepadStick(stick: GamepadStick): Vec2 {
		return state.mergedGamepadState.stickState.get(stick) || new Vec2(0)
	}

	function charInputted(): string[] {
		return [...state.charInputted]
	}

	function getGamepads(): KGamePad[] {
		return [...state.gamepads]
	}

	function processInput() {
		state.events.trigger("input")
		state.keyState.down.forEach((k) => state.events.trigger("keyDown", k))
		state.mouseState.down.forEach((k) => state.events.trigger("mouseDown", k))
		processGamepad()
	}

	function resetInput() {
		state.keyState.update()
		state.mouseState.update()
		state.mergedGamepadState.buttonState.update()
		state.mergedGamepadState.stickState.forEach((v, k) => {
			state.mergedGamepadState.stickState.set(k, new Vec2(0))
		})
		state.charInputted = []
		state.isMouseMoved = false

		state.gamepadStates.forEach((s) => {
			s.buttonState.update()
			s.stickState.forEach((v, k) => {
				s.stickState.set(k, new Vec2(0))
			})
		})
	}

	function registerGamepad(browserGamepad: Gamepad) {

		const gamepad = {
			index: browserGamepad.index,
			isPressed: (btn: GamepadButton) => {
				return state.gamepadStates.get(browserGamepad.index).buttonState.pressed.has(btn)
			},
			isDown: (btn: GamepadButton) => {
				return state.gamepadStates.get(browserGamepad.index).buttonState.down.has(btn)
			},
			isReleased: (btn: GamepadButton) => {
				return state.gamepadStates.get(browserGamepad.index).buttonState.released.has(btn)
			},
			getStick: (stick: GamepadStick) => {
				return state.gamepadStates.get(browserGamepad.index).stickState.get(stick)
			},
		}

		state.gamepads.push(gamepad)

		state.gamepadStates.set(browserGamepad.index, {
			buttonState: new ButtonState(),
			stickState: new Map([
				["left", new Vec2(0)],
				["right", new Vec2(0)],
			]),
		})

		return gamepad

	}

	function removeGamepad(gamepad: Gamepad) {
		state.gamepads = state.gamepads.filter((g) => g.index !== gamepad.index)
		state.gamepadStates.delete(gamepad.index)
	}

	function processGamepad() {

		for (const browserGamepad of navigator.getGamepads()) {
			if (browserGamepad && !state.gamepadStates.has(browserGamepad.index)) {
				registerGamepad(browserGamepad)
			}
		}

		for (const gamepad of state.gamepads) {

			const browserGamepad = navigator.getGamepads()[gamepad.index]
			const customMap = opt.gamepads ?? {}
			const map = customMap[browserGamepad.id] ?? GAMEPAD_MAP[browserGamepad.id] ?? GAMEPAD_MAP["default"]
			const gamepadState = state.gamepadStates.get(gamepad.index)

			for (let i = 0; i < browserGamepad.buttons.length; i++) {
				if (browserGamepad.buttons[i].pressed) {
					if (!gamepadState.buttonState.down.has(map.buttons[i])) {
						state.mergedGamepadState.buttonState.press(map.buttons[i])
						gamepadState.buttonState.press(map.buttons[i])
						state.events.trigger("gamepadButtonPress", map.buttons[i])
					}
					state.events.trigger("gamepadButtonDown", map.buttons[i])
				} else {
					if (gamepadState.buttonState.down.has(map.buttons[i])) {
						state.mergedGamepadState.buttonState.release(map.buttons[i])
						gamepadState.buttonState.release(map.buttons[i])
						state.events.trigger("gamepadButtonRelease", map.buttons[i])
					}
				}
			}

			for (const stickName in map.sticks) {
				const stick = map.sticks[stickName]
				const value = new Vec2(
					browserGamepad.axes[stick.x],
					browserGamepad.axes[stick.y],
				)
				gamepadState.stickState.set(stickName as GamepadStick, value)
				state.mergedGamepadState.stickState.set(stickName as GamepadStick, value)
				state.events.trigger("gamepadStick", stickName, value)
			}

		}

	}

	type EventList<M> = {
		[event in keyof M]?: (event: M[event]) => void
	}

	const canvasEvents: EventList<HTMLElementEventMap> = {}
	const docEvents: EventList<DocumentEventMap> = {}
	const winEvents: EventList<WindowEventMap> = {}

	const pd = opt.pixelDensity || window.devicePixelRatio || 1

	canvasEvents.mousemove = (e) => {
		const mousePos = new Vec2(e.offsetX, e.offsetY)
		const mouseDeltaPos = new Vec2(e.movementX, e.movementY)
		if (isFullscreen()) {
			const cw = state.canvas.width / pd
			const ch = state.canvas.height / pd
			const ww = window.innerWidth
			const wh = window.innerHeight
			const rw = ww / wh
			const rc = cw / ch
			if (rw > rc) {
				const ratio = wh / ch
				const offset = (ww - (cw * ratio)) / 2
				mousePos.x = map(e.offsetX - offset, 0, cw * ratio, 0, cw)
				mousePos.y = map(e.offsetY, 0, ch * ratio, 0, ch)
			} else {
				const ratio = ww / cw
				const offset = (wh - (ch * ratio)) / 2
				mousePos.x = map(e.offsetX , 0, cw * ratio, 0, cw)
				mousePos.y = map(e.offsetY - offset, 0, ch * ratio, 0, ch)
			}
		}
		state.events.onOnce("input", () => {
			state.isMouseMoved = true
			state.mousePos = mousePos
			state.mouseDeltaPos = mouseDeltaPos
			state.events.trigger("mouseMove")
		})
	}

	const MOUSE_BUTTONS: MouseButton[] = [
		"left",
		"middle",
		"right",
		"back",
		"forward",
	]

	canvasEvents.mousedown = (e) => {
		state.events.onOnce("input", () => {
			const m = MOUSE_BUTTONS[e.button]
			if (!m) return
			state.mouseState.press(m)
			state.events.trigger("mousePress", m)
		})
	}

	canvasEvents.mouseup = (e) => {
		state.events.onOnce("input", () => {
			const m = MOUSE_BUTTONS[e.button]
			if (!m) return
			state.mouseState.release(m)
			state.events.trigger("mouseRelease", m)
		})
	}

	const PREVENT_DEFAULT_KEYS = new Set([
		" ",
		"ArrowLeft",
		"ArrowRight",
		"ArrowUp",
		"ArrowDown",
		"Tab",
	])

	// translate these key names to a simpler version
	const KEY_ALIAS = {
		"ArrowLeft": "left",
		"ArrowRight": "right",
		"ArrowUp": "up",
		"ArrowDown": "down",
		" ": "space",
	}

	canvasEvents.keydown = (e) => {
		if (PREVENT_DEFAULT_KEYS.has(e.key)) {
			e.preventDefault()
		}
		state.events.onOnce("input", () => {
			const k = KEY_ALIAS[e.key] || e.key.toLowerCase()
			if (k.length === 1) {
				state.events.trigger("charInput", k)
				state.charInputted.push(k)
			} else if (k === "space") {
				state.events.trigger("charInput", " ")
				state.charInputted.push(" ")
			}
			if (e.repeat) {
				state.keyState.pressRepeat(k)
				state.events.trigger("keyPressRepeat", k)
			} else {
				state.keyState.press(k)
				state.events.trigger("keyPressRepeat", k)
				state.events.trigger("keyPress", k)
			}
		})
	}

	canvasEvents.keyup = (e) => {
		state.events.onOnce("input", () => {
			const k = KEY_ALIAS[e.key] || e.key.toLowerCase()
			state.keyState.release(k)
			state.events.trigger("keyRelease", k)
		})
	}

	// TODO: handle all touches at once instead of sequentially
	canvasEvents.touchstart = (e) => {
		// disable long tap context menu
		e.preventDefault()
		state.events.onOnce("input", () => {
			const touches = [...e.changedTouches]
			const box = state.canvas.getBoundingClientRect()
			if (opt.touchToMouse !== false) {
				state.mousePos = new Vec2(
					touches[0].clientX - box.x,
					touches[0].clientY - box.y,
				)
				state.mouseState.press("left")
				state.events.trigger("mousePress", "left")
			}
			touches.forEach((t) => {
				state.events.trigger(
					"touchStart",
					new Vec2(t.clientX - box.x, t.clientY - box.y),
					t,
				)
			})
		})
	}

	canvasEvents.touchmove = (e) => {
		// disable scrolling
		e.preventDefault()
		state.events.onOnce("input", () => {
			const touches = [...e.changedTouches]
			const box = state.canvas.getBoundingClientRect()
			if (opt.touchToMouse !== false) {
				const lastMousePos = state.mousePos
				state.mousePos = new Vec2(
					touches[0].clientX - box.x,
					touches[0].clientY - box.y,
				)
				state.mouseDeltaPos = state.mousePos.sub(lastMousePos)
				state.events.trigger("mouseMove")
			}
			touches.forEach((t) => {
				state.events.trigger(
					"touchMove",
					new Vec2(t.clientX - box.x, t.clientY - box.y),
					t,
				)
			})
		})
	}

	canvasEvents.touchend = (e) => {
		state.events.onOnce("input", () => {
			const touches = [...e.changedTouches]
			const box = state.canvas.getBoundingClientRect()
			if (opt.touchToMouse !== false) {
				state.mousePos = new Vec2(
					touches[0].clientX - box.x,
					touches[0].clientY - box.y,
				)
				state.mouseDeltaPos = new Vec2(0,0)
				state.mouseState.release("left")
				state.events.trigger("mouseRelease", "left")
			}
			touches.forEach((t) => {
				state.events.trigger(
					"touchEnd",
					new Vec2(t.clientX - box.x, t.clientY - box.y),
					t,
				)
			})
		})
	}

	canvasEvents.touchcancel = (e) => {
		state.events.onOnce("input", () => {
			const touches = [...e.changedTouches]
			const box = state.canvas.getBoundingClientRect()
			if (opt.touchToMouse !== false) {
				state.mousePos = new Vec2(
					touches[0].clientX - box.x,
					touches[0].clientY - box.y,
				)
				state.mouseState.release("left")
				state.events.trigger("mouseRelease", "left")
			}
			touches.forEach((t) => {
				state.events.trigger(
					"touchEnd",
					new Vec2(t.clientX - box.x, t.clientY - box.y),
					t,
				)
			})
		})
	}

	// TODO: option to not prevent default?
	canvasEvents.wheel = (e) => {
		e.preventDefault()
		state.events.onOnce("input", () => {
			state.events.trigger("scroll", new Vec2(e.deltaX, e.deltaY))
		})
	}

	canvasEvents.contextmenu = (e) => e.preventDefault()

	docEvents.visibilitychange = () => {
		if (document.visibilityState === "visible") {
			// prevent a surge of dt when switch back after the tab being hidden for a while
			state.skipTime = true
			state.isHidden = false
			state.events.trigger("show")
		} else {
			state.isHidden = true
			state.events.trigger("hide")
		}
	}

	winEvents.gamepadconnected = (e) => {
		const kbGamepad = registerGamepad(e.gamepad)
		state.events.onOnce("input", () => {
			state.events.trigger("gamepadConnect", kbGamepad)
		})
	}

	winEvents.gamepaddisconnected = (e) => {
		const kbGamepad = getGamepads().filter((g) => g.index === e.gamepad.index)[0]
		removeGamepad(e.gamepad)
		state.events.onOnce("input", () => {
			state.events.trigger("gamepadDisconnect", kbGamepad)
		})
	}

	for (const name in canvasEvents) {
		state.canvas.addEventListener(name, canvasEvents[name])
	}

	for (const name in docEvents) {
		document.addEventListener(name, docEvents[name])
	}

	for (const name in winEvents) {
		window.addEventListener(name, winEvents[name])
	}

	const resizeObserver = new ResizeObserver((entries) => {
		for (const entry of entries) {
			if (entry.target !== state.canvas) continue
			if (
				state.lastWidth === state.canvas.offsetWidth
				&& state.lastHeight === state.canvas.offsetHeight
			) return
			state.lastWidth = state.canvas.offsetWidth
			state.lastHeight = state.canvas.offsetHeight
			state.events.onOnce("input", () => {
				state.events.trigger("resize")
			})
		}
	})

	resizeObserver.observe(state.canvas)

	return {
		dt,
		time,
		run,
		canvas: state.canvas,
		fps,
		numFrames,
		quit,
		isHidden,
		setFullscreen,
		isFullscreen,
		setCursor,
		screenshot,
		getGamepads,
		getCursor,
		setCursorLocked,
		isCursorLocked,
		isTouchscreen,
		mousePos,
		mouseDeltaPos,
		isKeyDown,
		isKeyPressed,
		isKeyPressedRepeat,
		isKeyReleased,
		isMouseDown,
		isMousePressed,
		isMouseReleased,
		isMouseMoved,
		isGamepadButtonPressed,
		isGamepadButtonDown,
		isGamepadButtonReleased,
		getGamepadStick,
		charInputted,
		onResize,
		onKeyDown,
		onKeyPress,
		onKeyPressRepeat,
		onKeyRelease,
		onMouseDown,
		onMousePress,
		onMouseRelease,
		onMouseMove,
		onCharInput,
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		onScroll,
		onHide,
		onShow,
		onGamepadButtonDown,
		onGamepadButtonPress,
		onGamepadButtonRelease,
		onGamepadStick,
		onGamepadConnect,
		onGamepadDisconnect,
		events: state.events,
	}

}

