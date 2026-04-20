"""
Blender bpy script (v3 sobre base v2): Hero pavilion premium para arquitectura/ingeniería civil.

Meta:
- Reducir ruido visual y complejidad percibida.
- Aumentar jerarquía entre estructura, cubierta y cerramientos.
- Mejorar silueta comercial (frontal, 3/4 y lateral).
- Mantener low/mid poly + materiales glTF/GLB friendly.
"""

import bpy
import math
from mathutils import Vector


# ==========================================================
# CONFIGURACIÓN GLOBAL (editable)
# ==========================================================
CONFIG = {
    # Volumen base
    "base_length": 21.0,
    "base_width": 9.2,
    "platform_height": 0.34,
    "platform_chamfer": 0.04,

    # Estructura: jerarquía primaria/secundaria
    "num_portals": 5,
    "portal_spacing": 3.35,
    "portal_depth": 0.22,
    "portal_leg_width_primary": 0.28,
    "portal_leg_width_secondary": 0.20,
    "portal_head_height": 5.2,
    "portal_height_variation": 0.22,
    "portal_beam_thickness_primary": 0.20,
    "portal_beam_thickness_secondary": 0.14,
    "portal_rotation_deg": 1.4,

    # Cubierta: gesto limpio (2 piezas principales + quilla)
    "roof_thickness": 0.12,
    "roof_overhang_x": 1.35,
    "roof_overhang_y": 0.48,
    "roof_pitch_deg": 5.0,
    "roof_split_gap": 0.56,
    "roof_cantilever_shift": 0.34,

    # Paneles laterales: menor densidad + ritmo
    "num_fins_per_side": 4,
    "fin_thickness": 0.08,
    "fin_depth": 0.56,
    "fin_height": 2.95,
    "fin_inset_y": 0.68,

    # Cerramiento de vidrio (mínimo)
    "glass_height": 2.8,
    "glass_thickness": 0.035,
    "glass_length_ratio": 0.72,

    # Eje central / foco arquitectónico
    "void_length_ratio": 0.62,
    "walkway_width": 1.42,
    "walkway_thickness": 0.09,
    "spine_width": 0.24,
    "spine_height": 0.18,
    "core_width": 0.9,
    "core_depth": 1.6,
    "core_height": 3.0,

    # Escena
    "ground_size": 60.0,
    "background_strength": 0.45,

    # Exportación GLB
    "do_export_glb": False,
    "export_path": "//hero_pavilion_premium_v3.glb",

    # Vista en Blender
    "set_viewport_shading_to_material": True,
}


# ==========================================================
# UTILIDADES
# ==========================================================
def clean_scene():
    """Limpia escena para ejecución reproducible."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    for block in bpy.data.meshes:
        bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        bpy.data.materials.remove(block)
    for block in bpy.data.cameras:
        bpy.data.cameras.remove(block)
    for block in bpy.data.lights:
        bpy.data.lights.remove(block)
    for block in bpy.data.worlds:
        if block.users == 0:
            bpy.data.worlds.remove(block)


def ensure_collection(name="HeroPremiumV3"):
    scene = bpy.context.scene
    col = bpy.data.collections.new(name)
    scene.collection.children.link(col)
    return col


def link_to_collection(obj, col):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)


def assign_material(obj, mat):
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def add_bevel_modifier(obj, amount=0.015, segments=1, profile=0.7):
    """Bisel ligero para highlights premium sin costo alto en polígonos."""
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = amount
    bev.segments = segments
    bev.profile = profile
    bev.limit_method = 'ANGLE'
    bev.angle_limit = math.radians(35.0)


def create_box(name, size, location, collection, material=None, rotation=(0.0, 0.0, 0.0)):
    bpy.ops.mesh.primitive_cube_add(location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0] * 0.5, size[1] * 0.5, size[2] * 0.5)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    link_to_collection(obj, collection)
    if material is not None:
        assign_material(obj, material)
    return obj


def set_color_management_look(scene, preferred_looks):
    look_prop = scene.view_settings.bl_rna.properties.get("look")
    if look_prop is None:
        return None
    available = {item.identifier for item in look_prop.enum_items}
    for look_name in preferred_looks:
        if look_name in available:
            scene.view_settings.look = look_name
            return look_name
    return None


# ==========================================================
# MATERIALES (compactos, GLB-friendly)
# ==========================================================
def create_materials(cfg):
    mats = {}

    def set_bsdf_input(bsdf_node, socket_names, value):
        for socket_name in socket_names:
            socket = bsdf_node.inputs.get(socket_name)
            if socket is not None:
                socket.default_value = value
                return

    # Hormigón / mineral claro
    concrete = bpy.data.materials.new("M_Concrete")
    concrete.use_nodes = True
    bsdf = concrete.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.66, 0.67, 0.69, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.82
    bsdf.inputs["Metallic"].default_value = 0.0
    mats["concrete"] = concrete

    # Metal oscuro estructural
    metal = bpy.data.materials.new("M_DarkMetal")
    metal.use_nodes = True
    bsdf = metal.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.055, 0.06, 0.075, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.22
    bsdf.inputs["Metallic"].default_value = 0.98
    mats["metal"] = metal

    # Vidrio puntual
    glass = bpy.data.materials.new("M_Glass")
    glass.use_nodes = True
    bsdf = glass.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.78, 0.84, 0.9, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.04
    bsdf.inputs["Metallic"].default_value = 0.0
    set_bsdf_input(bsdf, ["Transmission Weight", "Transmission"], 0.92)
    bsdf.inputs["IOR"].default_value = 1.45
    glass.blend_method = 'BLEND'
    if hasattr(glass, "shadow_method"):
        glass.shadow_method = 'HASHED'
    mats["glass"] = glass

    world = bpy.data.worlds.new("HeroWorld")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.032, 0.035, 0.04, 1.0)
    bg.inputs[1].default_value = cfg["background_strength"]

    return mats


# ==========================================================
# CONSTRUCCIÓN: plataforma + estructura + envolvente
# ==========================================================
def build_platform(cfg, col, mats):
    plinth_h = cfg["platform_height"]

    base = create_box(
        name="BasePlatform",
        size=(cfg["base_length"], cfg["base_width"], plinth_h),
        location=(0.0, 0.0, plinth_h * 0.5),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(base, amount=cfg["platform_chamfer"], segments=1)

    display = create_box(
        name="DisplayPlinth",
        size=(cfg["base_length"] * 0.8, cfg["base_width"] * 0.7, 0.1),
        location=(0.0, 0.0, plinth_h + 0.05),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(display, amount=0.016, segments=1)

    return base


def build_portals(cfg, col, mats):
    """Portales con jerarquía: extremos y centro primarios, intermedios secundarios."""
    n = cfg["num_portals"]
    spacing = cfg["portal_spacing"]
    total_x = (n - 1) * spacing
    x_start = -total_x * 0.5

    plinth_h = cfg["platform_height"]
    clear_y = cfg["base_width"] * 0.5 - 1.0

    for i in range(n):
        x = x_start + i * spacing
        is_primary = i in {0, n // 2, n - 1}

        leg_w = cfg["portal_leg_width_primary"] if is_primary else cfg["portal_leg_width_secondary"]
        beam_t = cfg["portal_beam_thickness_primary"] if is_primary else cfg["portal_beam_thickness_secondary"]

        center_bias = 1.0 - abs((i / max(1, n - 1)) * 2.0 - 1.0)
        leg_h = cfg["portal_head_height"] * (1.0 + cfg["portal_height_variation"] * center_bias)

        yaw = math.radians((i - (n - 1) * 0.5) * cfg["portal_rotation_deg"])
        beam_w = clear_y * 2.0 + leg_w * 0.7

        z_leg = plinth_h + leg_h * 0.5
        z_beam = plinth_h + leg_h - beam_t * 0.5

        left_leg = create_box(
            name=f"PortalLegL_{i:02d}",
            size=(leg_w, cfg["portal_depth"], leg_h),
            location=(x, -clear_y, z_leg),
            rotation=(0.0, 0.0, yaw),
            collection=col,
            material=mats["metal"],
        )
        right_leg = create_box(
            name=f"PortalLegR_{i:02d}",
            size=(leg_w, cfg["portal_depth"], leg_h),
            location=(x, clear_y, z_leg),
            rotation=(0.0, 0.0, yaw),
            collection=col,
            material=mats["metal"],
        )
        head = create_box(
            name=f"PortalHead_{i:02d}",
            size=(leg_w, beam_w, beam_t),
            location=(x, 0.0, z_beam),
            rotation=(0.0, 0.0, yaw),
            collection=col,
            material=mats["metal"],
        )

        add_bevel_modifier(left_leg, amount=0.01 if is_primary else 0.006, segments=1)
        add_bevel_modifier(right_leg, amount=0.01 if is_primary else 0.006, segments=1)
        add_bevel_modifier(head, amount=0.01 if is_primary else 0.006, segments=1)

    return total_x, clear_y


def build_roof(cfg, col, mats, total_x):
    """Cubierta simplificada: dos alas grandes + quilla central limpia."""
    roof_len = total_x + cfg["roof_overhang_x"] * 2.0
    half_w = (cfg["base_width"] + cfg["roof_overhang_y"] * 2.0) * 0.5
    plinth_h = cfg["platform_height"]
    base_z = plinth_h + cfg["portal_head_height"] + 0.44

    pitch = math.radians(cfg["roof_pitch_deg"])
    gap = cfg["roof_split_gap"]

    left = create_box(
        name="RoofWing_Left",
        size=(roof_len, half_w - gap * 0.5, cfg["roof_thickness"]),
        location=(cfg["roof_cantilever_shift"], -(half_w + gap) * 0.25, base_z),
        rotation=(pitch, 0.0, math.radians(-0.5)),
        collection=col,
        material=mats["concrete"],
    )
    right = create_box(
        name="RoofWing_Right",
        size=(roof_len, half_w - gap * 0.5, cfg["roof_thickness"]),
        location=(-cfg["roof_cantilever_shift"] * 0.65, (half_w + gap) * 0.25, base_z + 0.16),
        rotation=(-pitch * 0.72, 0.0, math.radians(0.55)),
        collection=col,
        material=mats["concrete"],
    )

    ridge = create_box(
        name="RoofKeel",
        size=(roof_len * 0.82, gap * 0.86, cfg["roof_thickness"] * 0.48),
        location=(0.0, 0.0, base_z + 0.11),
        collection=col,
        material=mats["metal"],
    )

    add_bevel_modifier(left, amount=0.01, segments=1)
    add_bevel_modifier(right, amount=0.01, segments=1)
    add_bevel_modifier(ridge, amount=0.008, segments=1)


def build_side_composition(cfg, col, mats, total_x):
    """Paneles laterales menos densos, con ritmo intencional y respiración."""
    plinth_h = cfg["platform_height"]
    side_y = cfg["base_width"] * 0.5 - cfg["fin_inset_y"]

    # Ritmo deliberado: extremos limpios, foco cercano al centro
    n = cfg["num_fins_per_side"]
    normalized_positions = [-0.78, -0.28, 0.18, 0.7][:n]
    x_span = total_x * 0.54

    for side in (-1.0, 1.0):
        for idx, p in enumerate(normalized_positions):
            x = p * x_span
            center_bias = 1.0 - abs((idx / max(1, n - 1)) * 2.0 - 1.0)
            h = cfg["fin_height"] * (0.9 + center_bias * 0.16)
            z = plinth_h + h * 0.5
            yaw = math.radians(side * (1.2 - idx * 0.25))

            fin = create_box(
                name=f"SideFin_{'L' if side < 0 else 'R'}_{idx:02d}",
                size=(cfg["fin_thickness"], cfg["fin_depth"], h),
                location=(x, side * side_y, z),
                rotation=(0.0, 0.0, yaw),
                collection=col,
                material=mats["metal"],
            )
            add_bevel_modifier(fin, amount=0.006, segments=1)

    glass_len = total_x * cfg["glass_length_ratio"]
    glass_z = plinth_h + cfg["glass_height"] * 0.5

    create_box(
        name="GlassBand_Left",
        size=(glass_len, cfg["glass_thickness"], cfg["glass_height"]),
        location=(0.0, -side_y + 0.06, glass_z),
        collection=col,
        material=mats["glass"],
    )
    create_box(
        name="GlassBand_Right",
        size=(glass_len, cfg["glass_thickness"], cfg["glass_height"]),
        location=(0.0, side_y - 0.06, glass_z),
        collection=col,
        material=mats["glass"],
    )


def build_central_axis(cfg, col, mats, total_x):
    """Vacío central legible con eje de recorrido y núcleo integrado."""
    plinth_h = cfg["platform_height"]
    void_len = total_x * cfg["void_length_ratio"]

    # Pasarela central: eje principal de lectura
    walkway = create_box(
        name="CentralWalkway",
        size=(void_len, cfg["walkway_width"], cfg["walkway_thickness"]),
        location=(0.0, 0.0, plinth_h + 0.32),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(walkway, amount=0.006, segments=1)

    # Costillas longitudinales: acotan el vacío sin saturarlo
    rail_offset = cfg["walkway_width"] * 0.5 + cfg["spine_width"] * 0.45
    rail_z = plinth_h + 0.4
    for side in (-1.0, 1.0):
        rail = create_box(
            name=f"AxisSpine_{'L' if side < 0 else 'R'}",
            size=(void_len * 0.95, cfg["spine_width"], cfg["spine_height"]),
            location=(0.0, side * rail_offset, rail_z),
            collection=col,
            material=mats["metal"],
        )
        add_bevel_modifier(rail, amount=0.007, segments=1)

    # Núcleo integrado: pieza focal alineada al eje, no elemento aislado
    core = create_box(
        name="CorePavilion",
        size=(cfg["core_width"], cfg["core_depth"], cfg["core_height"]),
        location=(0.0, 0.0, plinth_h + cfg["core_height"] * 0.5 + 0.32),
        rotation=(0.0, 0.0, math.radians(3.2)),
        collection=col,
        material=mats["concrete"],
    )
    add_bevel_modifier(core, amount=0.012, segments=1)

    # Junta metálica para unir núcleo y eje (lectura compositiva)
    seam = create_box(
        name="CoreSeam",
        size=(cfg["core_width"] * 0.45, cfg["core_depth"] * 0.9, 0.06),
        location=(0.0, 0.0, plinth_h + 0.32 + cfg["walkway_thickness"] + 0.03),
        collection=col,
        material=mats["metal"],
    )
    add_bevel_modifier(seam, amount=0.004, segments=1)


def build_hero_pavilion(cfg, col, mats):
    platform = build_platform(cfg, col, mats)
    total_x, _ = build_portals(cfg, col, mats)
    build_roof(cfg, col, mats, total_x)
    build_side_composition(cfg, col, mats, total_x)
    build_central_axis(cfg, col, mats, total_x)

    for obj in col.objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = platform
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    bpy.ops.object.select_all(action='DESELECT')


# ==========================================================
# CÁMARA + LUZ + FONDO
# ==========================================================
def setup_camera_and_light(cfg):
    scene = bpy.context.scene

    # Cámara comercial (3/4, ligera elevación)
    cam_data = bpy.data.cameras.new("HeroCamera")
    cam = bpy.data.objects.new("HeroCamera", cam_data)
    scene.collection.objects.link(cam)

    cam.location = Vector((14.4, -11.8, 7.3))
    target = Vector((0.0, 0.0, 2.6))
    direction = target - cam.location
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()

    cam_data.lens = 54
    cam_data.sensor_width = 36
    cam_data.clip_start = 0.1
    cam_data.clip_end = 700
    scene.camera = cam

    # Luz principal
    key_data = bpy.data.lights.new(name="KeySun", type='SUN')
    key = bpy.data.objects.new(name="KeySun", object_data=key_data)
    scene.collection.objects.link(key)
    key.location = (9.0, -8.4, 15.0)
    key.rotation_euler = (math.radians(50.0), math.radians(3.0), math.radians(32.0))
    key_data.energy = 3.8
    key_data.angle = math.radians(0.35)

    # Fill suave para recorte de volúmenes
    fill_data = bpy.data.lights.new(name="FillArea", type='AREA')
    fill = bpy.data.objects.new(name="FillArea", object_data=fill_data)
    scene.collection.objects.link(fill)
    fill.location = (-7.8, 9.0, 5.4)
    fill.rotation_euler = (math.radians(75.0), 0.0, math.radians(-44.0))
    fill_data.energy = 58
    fill_data.color = (0.79, 0.83, 0.9)
    fill_data.size = 6.2

    # Suelo neutro oscuro
    bpy.ops.mesh.primitive_plane_add(location=(0.0, 0.0, 0.0), size=cfg["ground_size"])
    ground = bpy.context.active_object
    ground.name = "GroundPlane"

    ground_mat = bpy.data.materials.new("M_Ground")
    ground_mat.use_nodes = True
    bsdf = ground_mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.044, 0.048, 0.055, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.93
    assign_material(ground, ground_mat)

    set_color_management_look(
        scene,
        preferred_looks=[
            "AgX - Medium High Contrast",
            "Medium High Contrast",
            "AgX - High Contrast",
            "High Contrast",
            "None",
        ],
    )


# ==========================================================
# EXPORTACIÓN GLB
# ==========================================================
def export_glb_if_needed(cfg):
    if not cfg["do_export_glb"]:
        return

    bpy.ops.export_scene.gltf(
        filepath=cfg["export_path"],
        export_format='GLB',
        export_yup=True,
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_tangents=False,
        export_materials='EXPORT',
        export_colors=False,
        use_selection=False,
    )
    print(f"[OK] GLB exportado en: {cfg['export_path']}")


# ==========================================================
# MAIN
# ==========================================================
def main():
    clean_scene()
    work_col = ensure_collection("HeroPavilionPremiumV3")
    mats = create_materials(CONFIG)

    build_hero_pavilion(CONFIG, work_col, mats)
    setup_camera_and_light(CONFIG)

    if CONFIG["set_viewport_shading_to_material"] and bpy.context.screen is not None:
        for area in bpy.context.screen.areas:
            if area.type == 'VIEW_3D':
                for space in area.spaces:
                    if space.type == 'VIEW_3D':
                        space.shading.type = 'MATERIAL'

    export_glb_if_needed(CONFIG)
    print("[OK] Hero pavilion premium v3 generado.")


if __name__ == "__main__":
    main()
